class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :subtitle
      t.text :synopsis
      t.string :status
      t.belongs_to :user

      t.timestamps
    end
  end
end
