class CreateChapters < ActiveRecord::Migration[5.1]
  def change
    create_table :chapters do |t|
      t.integer :chapter_number
      t.string :title
      t.text :content
      t.belongs_to :project

      t.timestamps
    end
  end
end
