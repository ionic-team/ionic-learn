class AuthorsDataSource < Nanoc3::DataSource
  identifier :authors

  def items
    items = []
    authors = YAML.load(File.open("#{self.config[:data_root]}/authors.yml"))
    authors.each do |author|
      items << Nanoc::Item.new(
        "<%= render 'byline' %>",
        author.merge({kind: 'author'}),
        "/authors/bylines/#{author['slug']}/"
      )
    end
    items
  end
end
