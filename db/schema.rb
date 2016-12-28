# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161228211756) do

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "content",    limit: 65535
    t.integer  "user_id",                  null: false
    t.integer  "ticket_id",                null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["ticket_id"], name: "index_comments_on_ticket_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "tickets", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.text     "description",    limit: 65535
    t.integer  "status",                       default: 0, null: false
    t.integer  "author_id",                                null: false
    t.integer  "assigned_to_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["assigned_to_id"], name: "index_tickets_on_assigned_to_id", using: :btree
    t.index ["author_id"], name: "index_tickets_on_author_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email"
    t.string   "encrypted_password"
    t.string   "salt"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "role",               default: 0
  end

  add_foreign_key "comments", "tickets"
  add_foreign_key "comments", "users"
  add_foreign_key "tickets", "users", column: "assigned_to_id"
  add_foreign_key "tickets", "users", column: "author_id"
end
