<#
.SYNOPSIS
    A short one-line action-based description, e.g. 'Tests if a function is valid'
.DESCRIPTION
    A longer description of the function, its purpose, common use cases, etc.
.NOTES
    Information or caveats about the function e.g. 'This function is not supported in Linux'
.LINK
    Specify a URI to a help page, this will show when Get-Help -Online is used.
.EXAMPLE
    Test-MyTestFunction -Verbose
    Explanation of the function or its result. You can include multiple examples with additional .EXAMPLE lines
#>

[CmdletBinding()]
param (
    [Parameter()]
    [string]
    $Path
)

$lines = Get-Content $Path
$outLines = @()
foreach ($line in $lines) {
    $outLines += $line
    if ($line -match "// see: (\S+) (\S+)") {
        $sourcePath = $Matches[1]
        $blockName = $Matches[2]
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
        }
    }
}

Out-File $outLines -Encoding utf8NoBOM
