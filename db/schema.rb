# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141007033721) do

  create_table "comments", force: true do |t|
    t.text     "body",          null: false
    t.integer  "user_id"
    t.integer  "submission_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["submission_id"], name: "index_comments_on_submission_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "favorites", force: true do |t|
    t.integer  "user_id"
    t.integer  "submission_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "highlights", force: true do |t|
    t.date     "date",                   null: false
    t.integer  "interval",   default: 0
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "highlights_submissions", force: true do |t|
    t.integer "highlight_id"
    t.integer "submission_id"
  end

  create_table "identities", force: true do |t|
    t.string   "name"
    t.string   "username"
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: true do |t|
    t.string   "url"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "submission_counts", force: true do |t|
    t.integer  "upvotes",       default: 0
    t.integer  "submission_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "clicks",        default: 0
    t.integer  "comments",      default: 0
    t.integer  "favorites",     default: 0
  end

  add_index "submission_counts", ["upvotes"], name: "index_submission_counts_on_upvotes", using: :btree

  create_table "submissions", force: true do |t|
    t.string   "title",                    null: false
    t.string   "artist",                   null: false
    t.string   "url",                      null: false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "status",       default: 0, null: false
    t.date     "published_at"
    t.string   "flat_name",                null: false
  end

  add_index "submissions", ["user_id"], name: "index_submissions_on_user_id", using: :btree

  create_table "upvotes", force: true do |t|
    t.integer  "user_id"
    t.integer  "submission_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "nullified",     default: false
  end

  add_index "upvotes", ["submission_id"], name: "index_upvotes_on_submission_id", using: :btree
  add_index "upvotes", ["user_id"], name: "index_upvotes_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",            default: false
    t.string   "password_digest",                  null: false
    t.string   "avatar"
    t.boolean  "site_admin",       default: false
    t.string   "twitter_username"
  end

end
