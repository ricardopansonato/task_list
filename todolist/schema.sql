drop table if exists tasks;
create table tasks (
  task_id integer primary key autoincrement,
  text text not null,
  pub_date integer
);
