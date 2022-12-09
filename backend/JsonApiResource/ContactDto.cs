using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Middleware;
using JsonApiDotNetCore.Queries.Expressions;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace SampleWeb.JsonApiResource;

[Resource(PublicName = "contacts")]
[Table("Contact")]
// ReSharper disable once ClassNeverInstantiated.Global
public class ContactDto: IDbTracked, IIdentifiable<int>
{
    [Column("ContactId")]
    public int Id { get; set; }

    [Attr]
    public string? FirstName { get; set; }

    [Attr]
    public string? LastName { get; set; }

    [Attr]
    public DateOnly? DateOfBirth { get; set; }

    [Attr]
    public DateTimeOffset? NextOnlineMeeting { get; set; }

    // IDbRecord
    public DateTimeOffset? LastModifiedDate { get; set; }
    public DateTimeOffset? CreatedDate { get; set; }

    public string CreatedUserId { get; set; } = "invalid";
    public string? ModifiedUserId { get; set; }

    public int? IsActive { get; set; } = 1;

    [NotMapped]
    // IIdentifiable
    public string? StringId
    {
        get => Id.ToString();
        set => Id = int.Parse(value ?? throw new ArgumentNullException(nameof(value)));
    }

    /// <summary>
    /// If id is omitted due to this exception, a lid member MAY
    /// be included to uniquely identify the resource by type
    /// locally within the document. The value of the lid member
    /// MUST be identical for every representation of the resource
    /// in the document, including resource identifier objects.
    /// </summary>
    /// <see href="https://jsonapi.org/format/#document-resource-object-identification"/>
    [NotMapped]
    public string? LocalId { get; set; }

}

class ContactDtoResourceDefinition : JsonApiResourceDefinition<ContactDto, int>
{
    public ContactDtoResourceDefinition(IResourceGraph resourceGraph) : base(resourceGraph)
    {
    }

    public override FilterExpression? OnApplyFilter(FilterExpression? existingFilter)
    {
        Thread.Sleep(2000);
        return base.OnApplyFilter(existingFilter);
    }

    public override Task OnWritingAsync(ContactDto resource, WriteOperationKind writeOperation, CancellationToken cancellationToken)
    {
        if (writeOperation == WriteOperationKind.CreateResource)
        {
            resource.CreatedUserId = "admin";
            resource.CreatedDate = DateTime.Now;
        }

        if (writeOperation == WriteOperationKind.UpdateResource)
        {
            resource.ModifiedUserId = "admin";
            resource.LastModifiedDate = DateTime.Now;
        }

        return base.OnWritingAsync(resource, writeOperation, cancellationToken);
    }
}