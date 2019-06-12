prompt PL/SQL Developer import file
prompt Created on 2017年12月5日 by Van
set feedback off
set define off
prompt Dropping SYS_ATTACHMENT...
drop table SYS_ATTACHMENT cascade constraints;
prompt Dropping SYS_CODE...
drop table SYS_CODE cascade constraints;
prompt Dropping SYS_GLOBAL_PARAM...
drop table SYS_GLOBAL_PARAM cascade constraints;
prompt Dropping SYS_MENU...
drop table SYS_MENU cascade constraints;
prompt Dropping SYS_MENU_OPERATION...
drop table SYS_MENU_OPERATION cascade constraints;
prompt Dropping SYS_OP_LOG...
drop table SYS_OP_LOG cascade constraints;
prompt Dropping SYS_ORG...
drop table SYS_ORG cascade constraints;
prompt Dropping SYS_PERMISSION...
drop table SYS_PERMISSION cascade constraints;
prompt Dropping SYS_ROLE...
drop table SYS_ROLE cascade constraints;
prompt Dropping SYS_ROLE_MENU...
drop table SYS_ROLE_MENU cascade constraints;
prompt Dropping SYS_ROLE_USER...
drop table SYS_ROLE_USER cascade constraints;
prompt Dropping SYS_USER...
drop table SYS_USER cascade constraints;
prompt Dropping WF_FLOW_LOG...
drop table WF_FLOW_LOG cascade constraints;
prompt Dropping WF_FLOW_RESOURCE...
drop table WF_FLOW_RESOURCE cascade constraints;
prompt Dropping WF_WORKORDER...
drop table WF_WORKORDER cascade constraints;
prompt Creating SYS_ATTACHMENT...
create table SYS_ATTACHMENT
(
  id            VARCHAR2(100),
  file_path     VARCHAR2(2000),
  file_type     VARCHAR2(20),
  real_name     VARCHAR2(500),
  create_user   VARCHAR2(100),
  create_time   VARCHAR2(50),
  create_depart VARCHAR2(100),
  table_id      VARCHAR2(100),
  table_name    VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 128K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SYS_ATTACHMENT.id
  is '??ID';
comment on column SYS_ATTACHMENT.file_path
  is '????';
comment on column SYS_ATTACHMENT.file_type
  is '????';
comment on column SYS_ATTACHMENT.real_name
  is '??????';
comment on column SYS_ATTACHMENT.create_user
  is '???';
comment on column SYS_ATTACHMENT.create_time
  is '????';
comment on column SYS_ATTACHMENT.create_depart
  is '????';

prompt Creating SYS_CODE...
create table SYS_CODE
(
  code_type  VARCHAR2(50) not null,
  code_key   VARCHAR2(32) not null,
  code_value VARCHAR2(100) not null,
  id         VARCHAR2(50) not null,
  tree_code  VARCHAR2(500),
  tree_level NUMBER,
  parent_id  VARCHAR2(50)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_CODE
  add constraint ID primary key (ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_GLOBAL_PARAM...
create table SYS_GLOBAL_PARAM
(
  param_name        VARCHAR2(50),
  param_value       VARCHAR2(50),
  param_description VARCHAR2(100)
)
tablespace JLYDTEST
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_MENU...
create table SYS_MENU
(
  menu_id       VARCHAR2(50) not null,
  menu_name     VARCHAR2(200) not null,
  menu_url      VARCHAR2(500),
  memo          VARCHAR2(500),
  icon_path     VARCHAR2(500),
  parent_id     VARCHAR2(50),
  state         VARCHAR2(2),
  tree_code     VARCHAR2(500),
  display_order NUMBER,
  menu_level    NUMBER
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_MENU
  add primary key (MENU_ID)
  using index
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_MENU_OPERATION...
create table SYS_MENU_OPERATION
(
  id             VARCHAR2(50) not null,
  menu_id        VARCHAR2(50),
  operation_name VARCHAR2(50),
  operation_code VARCHAR2(50)
)
tablespace JLYDTEST
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_MENU_OPERATION
  add constraint 主键 primary key (ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_OP_LOG...
create table SYS_OP_LOG
(
  id          VARCHAR2(32) not null,
  user_id     VARCHAR2(32),
  user_ip     VARCHAR2(32),
  action_name VARCHAR2(32),
  method_name VARCHAR2(32),
  data_id     VARCHAR2(32),
  op_time     VARCHAR2(32),
  success     INTEGER default 0,
  param       VARCHAR2(2000)
)
tablespace JLYDTEST
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_OP_LOG
  add primary key (ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_ORG...
create table SYS_ORG
(
  org_id        VARCHAR2(50) not null,
  pid           VARCHAR2(50),
  name          VARCHAR2(500),
  memo          VARCHAR2(500),
  tree_code     VARCHAR2(500),
  display_order NUMBER,
  orglevel      NUMBER
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 128K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SYS_ORG.org_id
  is '??ID';
comment on column SYS_ORG.pid
  is '???';
comment on column SYS_ORG.name
  is '????';
comment on column SYS_ORG.memo
  is '??';
alter table SYS_ORG
  add constraint ORG_ID primary key (ORG_ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_PERMISSION...
create table SYS_PERMISSION
(
  role_id     VARCHAR2(32) not null,
  resource_id VARCHAR2(32) not null,
  auth_id     VARCHAR2(32) not null,
  key         VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_ROLE...
create table SYS_ROLE
(
  role_id     VARCHAR2(50) not null,
  role_name   VARCHAR2(200) not null,
  create_id   VARCHAR2(50) not null,
  create_time VARCHAR2(50),
  memo        VARCHAR2(500)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_ROLE
  add constraint ROLE_ID primary key (ROLE_ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_ROLE_MENU...
create table SYS_ROLE_MENU
(
  rm_id      VARCHAR2(100) not null,
  role_id    VARCHAR2(100),
  menu_id    VARCHAR2(100),
  operations VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_ROLE_MENU
  add constraint TRBAC_ROLE_MENU_PK primary key (RM_ID)
  using index
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_ROLE_USER...
create table SYS_ROLE_USER
(
  role_id VARCHAR2(50) not null,
  user_id VARCHAR2(50) not null,
  memo    VARCHAR2(500),
  ru_id   VARCHAR2(50) not null
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SYS_ROLE_USER
  add constraint RU_ID primary key (RU_ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating SYS_USER...
create table SYS_USER
(
  user_id        VARCHAR2(50) not null,
  create_id      VARCHAR2(32),
  login_id       VARCHAR2(32),
  password       VARCHAR2(32),
  org_id         VARCHAR2(50),
  user_name      VARCHAR2(200),
  user_sex       VARCHAR2(1),
  user_mobile    VARCHAR2(200),
  user_telephone VARCHAR2(200),
  user_mail      VARCHAR2(200),
  pwd_state      VARCHAR2(1),
  create_time    VARCHAR2(50),
  update_time    VARCHAR2(50),
  user_level     VARCHAR2(1),
  memo           VARCHAR2(500),
  emp_no         VARCHAR2(50),
  user_state     VARCHAR2(1),
  incharge_flag  VARCHAR2(1)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SYS_USER.user_state
  is '"1"???,"0"???';
comment on column SYS_USER.incharge_flag
  is '"1"????? ?0?????';
alter table SYS_USER
  add constraint USER_ID primary key (USER_ID)
  using index
  tablespace JLYDTEST
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating WF_FLOW_LOG...
create table WF_FLOW_LOG
(
  id        VARCHAR2(32) not null,
  user_id   VARCHAR2(32) not null,
  classname VARCHAR2(200) not null,
  state     VARCHAR2(32) not null,
  flow_id   VARCHAR2(32)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating WF_FLOW_RESOURCE...
create table WF_FLOW_RESOURCE
(
  appid        VARCHAR2(32) not null,
  deployid     VARCHAR2(32) not null,
  processid    VARCHAR2(32) not null,
  processname  VARCHAR2(1000) not null,
  appclassname VARCHAR2(500) not null,
  memo         VARCHAR2(2000) not null
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt Creating WF_WORKORDER...
create table WF_WORKORDER
(
  id               VARCHAR2(32) not null,
  create_time      VARCHAR2(200),
  creator_id       VARCHAR2(32) not null,
  creator_name     VARCHAR2(200),
  creator_org_id   VARCHAR2(32),
  data_id          VARCHAR2(32),
  name             VARCHAR2(200),
  model            VARCHAR2(32),
  conclusion       VARCHAR2(4000),
  org_id           VARCHAR2(1000) not null,
  assign_id        VARCHAR2(1000) not null,
  contract_name    VARCHAR2(200),
  rectify_require  VARCHAR2(2000),
  rectify_deadline VARCHAR2(200),
  audit_cycle      VARCHAR2(200),
  status           VARCHAR2(200),
  type             VARCHAR2(200),
  data_area_id     VARCHAR2(24)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column WF_WORKORDER.id
  is '??id';
comment on column WF_WORKORDER.create_time
  is '????';
comment on column WF_WORKORDER.creator_id
  is '???id';
comment on column WF_WORKORDER.creator_name
  is '?????';
comment on column WF_WORKORDER.creator_org_id
  is '?????id';
comment on column WF_WORKORDER.data_id
  is '???id';
comment on column WF_WORKORDER.name
  is '??name';
comment on column WF_WORKORDER.model
  is '????id';
comment on column WF_WORKORDER.conclusion
  is '??';
comment on column WF_WORKORDER.org_id
  is '????';
comment on column WF_WORKORDER.assign_id
  is '???id';
comment on column WF_WORKORDER.contract_name
  is '????';
comment on column WF_WORKORDER.rectify_require
  is '????';
comment on column WF_WORKORDER.rectify_deadline
  is '????';
comment on column WF_WORKORDER.audit_cycle
  is '????';
comment on column WF_WORKORDER.status
  is '????';
comment on column WF_WORKORDER.type
  is '????';

prompt Disabling triggers for SYS_ATTACHMENT...
alter table SYS_ATTACHMENT disable all triggers;
prompt Disabling triggers for SYS_CODE...
alter table SYS_CODE disable all triggers;
prompt Disabling triggers for SYS_GLOBAL_PARAM...
alter table SYS_GLOBAL_PARAM disable all triggers;
prompt Disabling triggers for SYS_MENU...
alter table SYS_MENU disable all triggers;
prompt Disabling triggers for SYS_MENU_OPERATION...
alter table SYS_MENU_OPERATION disable all triggers;
prompt Disabling triggers for SYS_OP_LOG...
alter table SYS_OP_LOG disable all triggers;
prompt Disabling triggers for SYS_ORG...
alter table SYS_ORG disable all triggers;
prompt Disabling triggers for SYS_PERMISSION...
alter table SYS_PERMISSION disable all triggers;
prompt Disabling triggers for SYS_ROLE...
alter table SYS_ROLE disable all triggers;
prompt Disabling triggers for SYS_ROLE_MENU...
alter table SYS_ROLE_MENU disable all triggers;
prompt Disabling triggers for SYS_ROLE_USER...
alter table SYS_ROLE_USER disable all triggers;
prompt Disabling triggers for SYS_USER...
alter table SYS_USER disable all triggers;
prompt Disabling triggers for WF_FLOW_LOG...
alter table WF_FLOW_LOG disable all triggers;
prompt Disabling triggers for WF_FLOW_RESOURCE...
alter table WF_FLOW_RESOURCE disable all triggers;
prompt Disabling triggers for WF_WORKORDER...
alter table WF_WORKORDER disable all triggers;
prompt Loading SYS_ATTACHMENT...
prompt Table is empty
prompt Loading SYS_CODE...
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('sex', '0', '性别', 'c685ebb9-ac2d-45eb-b282-a44232431331', '/c685ebb9-ac2d-45eb-b282-a44232431331', 1, null);
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('sex', '1', '男', '7688672d-f895-4fca-ae5f-85dec9781dd2', '/c685ebb9-ac2d-45eb-b282-a44232431331/7688672d-f895-4fca-ae5f-85dec9781dd2', 2, 'c685ebb9-ac2d-45eb-b282-a44232431331');
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('sex', '2', '女', '88b6057b-9a10-4e18-8237-648a0ee43d64', '/c685ebb9-ac2d-45eb-b282-a44232431331/88b6057b-9a10-4e18-8237-648a0ee43d64', 2, 'c685ebb9-ac2d-45eb-b282-a44232431331');
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('yesno', '-1', '否', '8aa70f78-5cb3-4246-93db-364e0c1baa79', '/8db77559-de25-46d9-89e6-6254317795a2/8aa70f78-5cb3-4246-93db-364e0c1baa79', 2, '8db77559-de25-46d9-89e6-6254317795a2');
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('yesno', '0', '是否', '8db77559-de25-46d9-89e6-6254317795a2', '/8db77559-de25-46d9-89e6-6254317795a2', 1, null);
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('yesno', '1', '是', 'd35e5851-1038-43e1-95a2-99bcbc9a23bd', '/8db77559-de25-46d9-89e6-6254317795a2/d35e5851-1038-43e1-95a2-99bcbc9a23bd', 2, '8db77559-de25-46d9-89e6-6254317795a2');
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('qiJin', '0', '启用禁用', '64bbb5a3-3b05-408c-85c5-626db95b85e6', '/64bbb5a3-3b05-408c-85c5-626db95b85e6', 1, null);
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('qiJin', '1', '启用', '4fb00a12-1b8a-4416-949c-034ccd3f8d06', '/64bbb5a3-3b05-408c-85c5-626db95b85e6/4fb00a12-1b8a-4416-949c-034ccd3f8d06', 2, '64bbb5a3-3b05-408c-85c5-626db95b85e6');
insert into SYS_CODE (code_type, code_key, code_value, id, tree_code, tree_level, parent_id)
values ('qiJin', '-1', '禁用', '30e4ccfe-ff93-4709-82cc-bd07ad4e8972', '/64bbb5a3-3b05-408c-85c5-626db95b85e6/30e4ccfe-ff93-4709-82cc-bd07ad4e8972', 2, '64bbb5a3-3b05-408c-85c5-626db95b85e6');
commit;
prompt 9 records loaded
prompt Loading SYS_GLOBAL_PARAM...
insert into SYS_GLOBAL_PARAM (param_name, param_value, param_description)
values ('menu_style', '0', '菜单样式 0：左导航；1：上导航');
insert into SYS_GLOBAL_PARAM (param_name, param_value, param_description)
values ('version', '0.0.1', '系统版本号');
commit;
prompt 2 records loaded
prompt Loading SYS_MENU...
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('32', '待办事项', '/pages/jsp/workbench/workorder/backlogWorkOrder.jsp', null, null, '3', '1', '/3/32', 2, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('81', '表格', '/pages/jsp/demo/grid.jsp', null, null, '8', '1', '/8/81', 2, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('31', '我的工单', '/pages/jsp/workbench/workorder/myWorkOrder.jsp', null, null, '3', '1', '/3/31', 1, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('83', '按钮及图标', '/pages/jsp/demo/buttons.jsp', null, null, '8', '1', '/8/83', 3, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('84', '布局', '/pages/jsp/demo/layout.jsp', null, null, '8', '1', '/8/84', 4, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('8', '前台组件', null, null, 'fa-wrench', null, '1', '/8', 4, 1);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('82', '表单', '/pages/jsp/demo/form.jsp', null, null, '8', '1', '/8/82', 1, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('7', '系统管理', null, null, 'fa-cogs', null, '1', '/7', 3, 1);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('72', '组织结构', '/pages/jsp/system/sysorg/sysOrg.jsp', null, null, '7', '1', '/7/72', 3, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('71', '用户信息', '/pages/jsp/system/sysuser/sysUser.jsp', 'add,update,', null, '7', '1', '/7/71', 2, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('74', '菜单管理', '/pages/jsp/system/sysmenu/sysMenu.jsp', null, null, '7', '1', '/7/74', 1, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('75', '日志管理', '/pages/jsp/system/log/logManage.jsp', null, null, '7', '1', '/7/75', 5, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('73', '角色信息', '/pages/jsp/system/sysrole/sysRole.jsp', null, null, '7', '1', '/7/73', 3, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('3', '工作台', null, null, 'fa-desktop', null, '1', '/3', 2, 1);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('34', '工单查询', '/pages/jsp/workbench/workorder/workOrder.jsp', null, null, '3', '1', '/3/34', 4, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('33', '已办事项', '/pages/jsp/workbench/workorder/participate.jsp', null, null, '3', '1', '/3/33', 3, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('76', '流程管理', '/pages/jsp/activiti/activitiModel.jsp', null, null, '7', '1', '/7/76', 6, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('77', '关联管理', '/pages/jsp/activiti/flowManager.jsp', null, null, '7', '1', '/7/77', 7, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('85', 'iframe高度', '/pages/jsp/demo/iframeHeight.jsp', null, null, '8', '1', '/8/85', 5, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('1', '仪表盘', '/pages/jsp/login/index.jsp', null, 'fa-tachometer', null, '1', '/1', 1, 1);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('78', '参数管理', '/pages/jsp/system/sysglobalparam/sysGlobalParam.jsp', null, null, '7', '1', '/7/78', 8, 2);
insert into SYS_MENU (menu_id, menu_name, menu_url, memo, icon_path, parent_id, state, tree_code, display_order, menu_level)
values ('79', '数据字典', '/pages/jsp/system/syscode/sysCode.jsp', null, null, '7', '1', '/7/79', 9, 2);
commit;
prompt 22 records loaded
prompt Loading SYS_MENU_OPERATION...
insert into SYS_MENU_OPERATION (id, menu_id, operation_name, operation_code)
values ('1', '71', '新增', 'add');
insert into SYS_MENU_OPERATION (id, menu_id, operation_name, operation_code)
values ('2', '71', '修改', 'update');
insert into SYS_MENU_OPERATION (id, menu_id, operation_name, operation_code)
values ('3', '71', '删除', 'delete');
commit;
prompt 1 records loaded
prompt Loading SYS_ORG...
insert into SYS_ORG (org_id, pid, name, memo, tree_code, display_order, orglevel)
values ('79be0e1a-f42c-4be7-b996-a25e89c18667', null, '省公司', null, '/79be0e1a-f42c-4be7-b996-a25e89c18667', 1, 1);
commit;
prompt 1 records loaded
prompt Loading SYS_ROLE...
insert into SYS_ROLE (role_id, role_name, create_id, create_time, memo)
values ('1', '工作流人员', '0', null, null);
insert into SYS_ROLE (role_id, role_name, create_id, create_time, memo)
values ('0', '系统管理员', '0', null, '系统管理');
commit;
prompt 2 records loaded
prompt Loading SYS_ROLE_MENU...
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('c167f0cd-80f1-4549-a0f0-4543035f9b26', '0', '79', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('4b91345e-81e1-4e33-837e-47e70506367d', '0', '3', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('ce9f8f7a-dd17-4921-943b-f9325e24b751', '0', '31', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('0390bfab-b834-4a41-bf80-ce397b970f01', '0', '32', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('02c612dc-4b68-442d-abbe-9acf8d91bd61', '0', '33', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('496d7424-9873-4e2b-bff4-ffec1a3ffb6c', '0', '34', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('e6359006-60b0-4c9f-a70a-29320417b12c', '0', '7', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('7c55a9a2-6a67-4ee4-918c-e62fa921fa08', '0', '74', 'add#');
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('8654e119-e8c3-44c4-895b-742fd806db5d', '0', '71', 'add#update#delete#');
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('e2f66fdc-3aaf-45dd-a226-9b3df723d877', '0', '72', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('2ba6126c-6a8b-4d4f-9352-e1440c6bd1c5', '0', '73', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('97740533-84b8-4b35-baf9-4e91ecdfcadc', '0', '75', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('5b92e800-e679-4049-acc0-5fc919013a4e', '0', '76', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('c7d3f989-4fe5-46b3-9b7c-68f3a1d6c8f2', '0', '77', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('6e4eec4d-bf89-4eb0-a8bf-68f83b5d9a83', '0', '78', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('7d03cf7f-d490-4043-9587-3f0e8c071cb5', '0', '81', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('08a59160-061b-45ab-b0ab-3ad019718166', '0', '84', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('9a9d3e66-d81e-41da-af61-6eba852465bf', '0', '8', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('12ff164b-a7d6-471c-8a9d-5193e24cd27b', '0', '1', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('74526c5b-9443-45c6-9f56-4ae7b140c516', '0', '83', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('1b0ecc23-0ec5-423d-8b30-02db4079cfd1', '0', '82', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('15a60756-d135-47b7-bf84-6baefec33e1b', '1', '81', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('7704348a-aa92-487c-ba26-9dabb9de2c65', '1', '3', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('154c618b-083b-4ac0-81cb-405f20d0254d', '1', '31', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('88bf186a-359e-4e17-a0aa-97c36120991e', '1', '32', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('f2f48cb1-95a7-4c15-9a0e-eb4c7175bfe9', '1', '33', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('03ac215c-88d2-4ff7-9af5-a3b2f4882675', '1', '34', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('0f7a09bb-e838-4f73-a81f-73546c1a7779', '1', '7', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('6f562e6b-ae17-4744-a68f-afd362e6a93d', '1', '74', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('e87afa63-629c-41b3-bf10-c1027c8d211f', '1', '71', 'add#');
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('369b0255-6f1a-4879-bcf7-e529c2b0a373', '1', '72', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('ef9f3f31-4df0-44bf-b910-bc7b800359fa', '1', '73', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('05afa142-fdd2-4ae1-b063-ba879f65e2a0', '1', '75', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('8f85fdce-dd30-4e92-8346-d56b6306938b', '1', '76', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('bcbd4398-f7cb-44b3-a362-b65f8c4cb8ee', '1', '8', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('73a2459d-52fd-4588-95f7-74c7c5edfbc4', '1', '83', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('2af9f28e-8848-4b8f-9149-ca0f78687145', '1', '1', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('27718f82-aedb-4526-ae28-1f0bd8e93df1', '1', '82', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('48b75010-2e4a-4288-ba21-26d8e150f717', '1', '78', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('b83d1e09-c39c-4cbb-8c2d-37872ae39420', '1', '85', null);
insert into SYS_ROLE_MENU (rm_id, role_id, menu_id, operations)
values ('ee54df6a-10d9-4447-a9a5-74cad31f3d14', '1', '84', null);
commit;
prompt 41 records loaded
prompt Loading SYS_ROLE_USER...
insert into SYS_ROLE_USER (role_id, user_id, memo, ru_id)
values ('0', '0', null, '3bdedd0c-6637-4645-8700-b34625634faf');
insert into SYS_ROLE_USER (role_id, user_id, memo, ru_id)
values ('1', '0', null, '09b6a88f-e2a0-414e-a0ab-916d23229e20');
commit;
prompt 2 records loaded
prompt Loading SYS_USER...
insert into SYS_USER (user_id, create_id, login_id, password, org_id, user_name, user_sex, user_mobile, user_telephone, user_mail, pwd_state, create_time, update_time, user_level, memo, emp_no, user_state, incharge_flag)
values ('0', '0', 'admin', '21232f297a57a5a743894a0e4a801fc3', '79be0e1a-f42c-4be7-b996-a25e89c18667', '超级管理员', '1', '13888888888', null, 'admin@bonc.com.cn', null, null, null, null, null, null, '1', null);
commit;
prompt 1 records loaded
prompt Loading WF_FLOW_LOG...
prompt Table is empty
prompt Loading WF_FLOW_RESOURCE...
prompt Table is empty
prompt Loading WF_WORKORDER...
prompt Table is empty
prompt Enabling triggers for SYS_ATTACHMENT...
alter table SYS_ATTACHMENT enable all triggers;
prompt Enabling triggers for SYS_CODE...
alter table SYS_CODE enable all triggers;
prompt Enabling triggers for SYS_GLOBAL_PARAM...
alter table SYS_GLOBAL_PARAM enable all triggers;
prompt Enabling triggers for SYS_MENU...
alter table SYS_MENU enable all triggers;
prompt Enabling triggers for SYS_MENU_OPERATION...
alter table SYS_MENU_OPERATION enable all triggers;
prompt Enabling triggers for SYS_OP_LOG...
alter table SYS_OP_LOG enable all triggers;
prompt Enabling triggers for SYS_ORG...
alter table SYS_ORG enable all triggers;
prompt Enabling triggers for SYS_PERMISSION...
alter table SYS_PERMISSION enable all triggers;
prompt Enabling triggers for SYS_ROLE...
alter table SYS_ROLE enable all triggers;
prompt Enabling triggers for SYS_ROLE_MENU...
alter table SYS_ROLE_MENU enable all triggers;
prompt Enabling triggers for SYS_ROLE_USER...
alter table SYS_ROLE_USER enable all triggers;
prompt Enabling triggers for SYS_USER...
alter table SYS_USER enable all triggers;
prompt Enabling triggers for WF_FLOW_LOG...
alter table WF_FLOW_LOG enable all triggers;
prompt Enabling triggers for WF_FLOW_RESOURCE...
alter table WF_FLOW_RESOURCE enable all triggers;
prompt Enabling triggers for WF_WORKORDER...
alter table WF_WORKORDER enable all triggers;
set feedback on
set define on
prompt Done.
