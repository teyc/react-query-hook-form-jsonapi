using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SampleWeb.DataAccess;

public class DateTimeOffsetToStringConverter: ValueConverter<DateTimeOffset, string>
{
    public DateTimeOffsetToStringConverter() : base(v => v.ToString("o"), v => DateTimeOffset.Parse(v))
    {
    }
    
    public DateTimeOffsetToStringConverter(Expression<Func<DateTimeOffset, string>> convertToProviderExpression,
        Expression<Func<string, DateTimeOffset>> convertFromProviderExpression,
        ConverterMappingHints? mappingHints = null) : base(convertToProviderExpression,
        convertFromProviderExpression,
        mappingHints)
    {
    }

    public DateTimeOffsetToStringConverter(Expression<Func<DateTimeOffset, string>> convertToProviderExpression,
        Expression<Func<string, DateTimeOffset>> convertFromProviderExpression,
        bool convertsNulls,
        ConverterMappingHints? mappingHints = null) 
#pragma warning disable EF1001
        : base(v => v.ToString("o"), v => DateTimeOffset.Parse(v), false, mappingHints)
#pragma warning restore EF1001
    {
    }

}