package <%= packageName %>.model.query;

public record Find<%= entityName %>sQuery(int pageNo, int pageSize, String sortBy, String sortDir) {}