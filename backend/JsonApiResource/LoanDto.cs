using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Middleware;
using JsonApiDotNetCore.Queries.Expressions;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace SampleWeb.JsonApiResource;

[Resource(PublicName = "loans")]
[Table("Loan")]
// ReSharper disable once ClassNeverInstantiated.Global
public class LoanDto : IDbTracked, IIdentifiable<int>
{
    [Attr]
    public decimal? LoanAmount { get; set; }

    [Attr]
    public Collection<ContactDto> Borrowers { get; set; }

    public DateTimeOffset? LastModifiedDate { get; set; }
    public DateTimeOffset? CreatedDate { get; set; }
    public string CreatedUserId { get; set; } = "invalid";
    public string? ModifiedUserId { get; set; }
    public int? IsActive { get; set; }

    [NotMapped]
    public string? StringId { get; set; }

    [NotMapped]
    public string? LocalId { get; set; }
    public int Id { get; set; }
}