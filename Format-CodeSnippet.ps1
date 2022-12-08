<#
.SYNOPSIS
    Weaves source code into an existing text file in specially markedd sections
.DESCRIPTION
    A longer description of the function, its purpose, common use cases, etc.
.NOTES
    Information or caveats about the function e.g. 'This function is not supported in Linux'
.LINK
    Specify a URI to a help page, this will show when Get-Help -Online is used.
.EXAMPLE
    You'd like to insert the following snippet into a file called MyMarkdownFile.md:

## how-to-insert : begin
## Note

This document contains generated section, to keep it up-to-date

```
.\Format-CodeSnippet.ps1 .\path\to\this\file.md
```
## how-to-insert : end

    You should wrap the snippet in 'begin' and 'end' sections.

    ./Format-CodeSnippet.ps1 MyMarkdownFile.md
    The MyMarkdownFile.md will be overwritten and the sections between
    "see:" and "end:" will be replaced by code snippets

.EXAMPLE
    ./Format-CodeSnippet.ps1 -DryRun MyMarkdownFile.md
    
    Sends the output to standard output instead of overwriting the file
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [string]
    # Path to the markdown file
    $Path,

    [Switch]
    # Do not overwrite the markdown file
    $DryRun

)

$lines = Get-Content $Path
$outLines = @()
$isInsertingCodeSnippet = $false

foreach ($line in $lines) {

    if (-Not $isInsertingCodeSnippet) {
        $outLines += $line
    } elseif ($isInsertingCodeSnippet -and $line -match $endMarker) {
        Write-Verbose "Found: '$endMarker'"
        $outLines += $line
        $isInsertingCodeSnippet = $false
    }

    # e.g. '// see: ./path/to/SomeClass.cs block-name'
    if ($line -match "(^\S+ see:) (\S+) (\S+)") {

        # e.g. // see:
        $startMarker = $Matches[1]
        Write-Verbose "startMarker: '$startMarker'"

        # e.g. // end:
        $endMarker = "^" + ($startMarker -replace ('see:', 'end:'))
        Write-Verbose "endMarker: '$endMarker'"
        $isInsertingCodeSnippet = $true

        # e.g. ./path/to/SomeClass.cs , calculate relative paths
        $sourcePath = $Matches[2]
        $sourcePath = Join-Path -Resolve (Split-Path -Parent $Path) $sourcePath
        Write-Verbose "sourcePath: '$sourcePath'"

        # e.g. block-name
        $blockName = $Matches[3]

        if (-Not (Test-Path $sourcePath)) {
            Write-Warning "$sourcePath not found"
            Continue
        }

        if ($blockName -eq "*full*") {
            # Add the entire file
            $outLines += Get-Content $sourcePath
        }
        else {
            $source = Get-Content $sourcePath
            $snippet = $source. `
                Where({ $_ -Match "$blockName : begin" }, 'SkipUntil'). `
                Where({ $_ -Match "$blockName : end" }, "Until")

            $firstItem, $rest = $snippet
            $outLines += $rest

            If ($rest.Length -eq 0) {
               Write-Warning "$sourcePath does not contain '$blockName : begin'"
            }
        }
    }
}

If ($DryRun) {
    Write-Output ($outLines -Join "`n")
} else {
    ($outLines -Join "`n") | Out-File $Path -Encoding utf8NoBOM
}
