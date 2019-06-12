
/*
  单元测试构造数据
 */
DELETE FROM sys_role_user where user_id!='0';
DELETE FROM sys_role where role_id !='0';
DELETE FROM sys_user where user_id !='0';

INSERT INTO sys_user (user_id, create_id, login_id, password, user_level) VALUES (1,'0','user1','cfcd208495d565ef66e7dff9f98764da','2');
INSERT INTO sys_user (user_id, create_id, login_id, password, user_level) VALUES (2,'0','user2','cfcd208495d565ef66e7dff9f98764da','2');