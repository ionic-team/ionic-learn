class ResourcesDataSource < Nanoc3::DataSource
  identifier :resources

  def items
    items = []
    categories = YAML.load(File.open("#{self.config[:data_root]}/resources.yml"))["categories"]
    categories.each do |category|
      category["resources"].each do |resource|
        slugized_name = resource["name"].downcase.gsub(/ /, '-')
        items << Nanoc::Item.new(
          "<%= render 'resource_detail' %>",
          resource.merge({kind: 'resource', category: category["name"]}),
          "/resources/items/#{slugized_name}/"
        )
      end
    end
    items
  end
end
