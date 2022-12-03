using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SampleWeb.JsonApiResource;

namespace SampleWeb.DataAccess;

public class MyCrmDbContext: DbContext
{
   public MyCrmDbContext(DbContextOptions<MyCrmDbContext> options): base(options)
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
   }
   
   public virtual DbSet<ContactDto> Contacts { get; set; } = default!;
}