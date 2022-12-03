namespace SampleWeb.Infrastructure.Conventions;

public interface IDbTracked
{
    public DateTimeOffset? LastModifiedDate { get; set; }
    
    // TODO: CreatedDate vs DateCreated current usage
    public DateTimeOffset? CreatedDate { get; set; }
    public string CreatedUserId { get; set; }
    public string? ModifiedUserId { get; set; }
    public int? IsActive { get; set; }
}