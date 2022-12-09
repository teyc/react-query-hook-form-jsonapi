using Microsoft.EntityFrameworkCore;
using SampleWeb.JsonApiResource;

namespace SampleWeb.DataAccess;

public class MyCrmDbContext : DbContext
{
    public MyCrmDbContext(DbContextOptions<MyCrmDbContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        {
            // SQLite does not have proper support for DateTimeOffset via Entity Framework Core, see the limitations
            // here: https://docs.microsoft.com/en-us/ef/core/providers/sqlite/limitations#query-limitations
            // To work around this, when the Sqlite database provider is used, all model properties of type DateTimeOffset
            // use the DateTimeOffsetToBinaryConverter
            // Based on: https://github.com/aspnet/EntityFrameworkCore/issues/10784#issuecomment-415769754
            // This only supports millisecond precision, but should be sufficient for most use cases.
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(DateTimeOffset)
                                                                               || p.PropertyType == typeof(DateTimeOffset?));
                foreach (var property in properties)
                {
                    builder
                       .Entity(entityType.Name)
                       .Property(property.Name)
                       .HasConversion(new DateTimeOffsetToStringConverter());
                }
            }
        }

        SeedData(builder);
    }

    public virtual DbSet<ContactDto> Contacts { get; set; } = default!;

    public virtual DbSet<LoanDto> LoanDtos { get; set; } = default!;


    private void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactDto>().HasData(
           new ContactDto
           {
               Id = 1,
               CreatedDate = DateTime.Now,
               CreatedUserId = "1",
               DateOfBirth = new DateOnly(1985, 03, 05),
               FirstName = "Max",
               LastName = "Melwell",
               IsActive = 1,
               NextOnlineMeeting = new DateTimeOffset(2022, 12, 25, 13, 0, 0, TimeSpan.FromHours(10.0))
           }
        );

        modelBuilder.Entity<ContactDto>().HasData(
            new ContactDto
            {
                Id = 2,
                CreatedDate = DateTime.Now,
                CreatedUserId = "1",
                DateOfBirth = new DateOnly(1985, 03, 05),
                FirstName = "Minne",
                LastName = "Driver",
                IsActive = 1,
                NextOnlineMeeting = null,
            }
        );

        modelBuilder.Entity<LoanDto>().HasData(
            new LoanDto
            {
                Id = 1,
                CreatedDate = DateTime.Now,
                CreatedUserId = "2",
                IsActive = 1,
                LoanAmount = 250_000.00M,
            }
        );

        // seed many-to-many relationship
        modelBuilder.Entity("ContactDtoLoanDto").HasData(
            new { BorrowersId = 1, LoansId = 1 },
            new { BorrowersId = 2, LoansId = 1 }
        );


    }
}