# Creating a new resource

1. Add a Dto class in /JsonApiResource

2. Add `[Attr]` to any property that is visible on the client side

3. StringId and LocalId must be marked as `[NotMapped]`

4. Add the Dto to the DbContext

5. Create an EF migration

   ```
   dotnet ef migrations add LoanDto
   ```

6. Update the database

   ```
   dotnet ef database update
   ```
