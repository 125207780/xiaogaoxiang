/*
SQLyog Ultimate v12.5.0 (64 bit)
MySQL - 5.7.20 : Database - hq_audit
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- CREATE DATABASE /*!32312 IF NOT EXISTS*/`hq_audit` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `sys_attachment` */

DROP TABLE IF EXISTS `sys_attachment`;

CREATE TABLE `sys_attachment` (
  `id` varchar(100) NOT NULL,
  `file_path` varchar(2000) DEFAULT NULL,
  `file_type` varchar(20) DEFAULT NULL,
  `real_name` varchar(500) DEFAULT NULL,
  `create_user` varchar(100) DEFAULT NULL,
  `create_time` varchar(50) DEFAULT NULL,
  `create_depart` varchar(100) DEFAULT NULL,
  `table_id` varchar(100) DEFAULT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_attachment` */

/*Table structure for table `sys_code` */

DROP TABLE IF EXISTS `sys_code`;

CREATE TABLE `sys_code` (
  `id` varchar(50) NOT NULL,
  `code_type` varchar(50) NOT NULL,
  `code_key` varchar(32) NOT NULL,
  `code_value` varchar(100) NOT NULL,
  `tree_code` varchar(500) DEFAULT NULL,
  `tree_level` tinyint(4) DEFAULT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_code` */

insert  into `sys_code`(`id`,`code_type`,`code_key`,`code_value`,`tree_code`,`tree_level`,`parent_id`) values 
('30e4ccfe-ff93-4709-82cc-bd07ad4e8972','qiJin','-1','禁用','/64bbb5a3-3b05-408c-85c5-626db95b85e6/30e4ccfe-ff93-4709-82cc-bd07ad4e8972',2,'64bbb5a3-3b05-408c-85c5-626db95b85e6'),
('4fb00a12-1b8a-4416-949c-034ccd3f8d06','qiJin','1','启用','/64bbb5a3-3b05-408c-85c5-626db95b85e6/4fb00a12-1b8a-4416-949c-034ccd3f8d06',2,'64bbb5a3-3b05-408c-85c5-626db95b85e6'),
('64bbb5a3-3b05-408c-85c5-626db95b85e6','qiJin','0','启用禁用','/64bbb5a3-3b05-408c-85c5-626db95b85e6',1,NULL),
('7688672d-f895-4fca-ae5f-85dec9781dd2','sex','1','男','/c685ebb9-ac2d-45eb-b282-a44232431331/7688672d-f895-4fca-ae5f-85dec9781dd2',2,'c685ebb9-ac2d-45eb-b282-a44232431331'),
('88b6057b-9a10-4e18-8237-648a0ee43d64','sex','2','女','/c685ebb9-ac2d-45eb-b282-a44232431331/88b6057b-9a10-4e18-8237-648a0ee43d64',2,'c685ebb9-ac2d-45eb-b282-a44232431331'),
('8aa70f78-5cb3-4246-93db-364e0c1baa79','yesno','-1','否','/8db77559-de25-46d9-89e6-6254317795a2/8aa70f78-5cb3-4246-93db-364e0c1baa79',2,'8db77559-de25-46d9-89e6-6254317795a2'),
('8db77559-de25-46d9-89e6-6254317795a2','yesno','0','是否','/8db77559-de25-46d9-89e6-6254317795a2',1,NULL),
('c685ebb9-ac2d-45eb-b282-a44232431331','sex','0','性别','/c685ebb9-ac2d-45eb-b282-a44232431331',1,NULL),
('d35e5851-1038-43e1-95a2-99bcbc9a23bd','yesno','1','是','/8db77559-de25-46d9-89e6-6254317795a2/d35e5851-1038-43e1-95a2-99bcbc9a23bd',2,'8db77559-de25-46d9-89e6-6254317795a2');

/*Table structure for table `sys_global_param` */

DROP TABLE IF EXISTS `sys_global_param`;

CREATE TABLE `sys_global_param` (
  `param_name` varchar(50) NOT NULL,
  `param_value` varchar(50) DEFAULT NULL,
  `param_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_global_param` */

insert  into `sys_global_param`(`param_name`,`param_value`,`param_description`) values 
('menu_style','0','菜单样式 0：左导航；1：上导航'),
('version','0.0.1','系统版本号');

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `menu_id` varchar(50) NOT NULL,
  `menu_name` varchar(200) NOT NULL,
  `menu_url` varchar(500) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `icon_path` varchar(500) DEFAULT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `tree_code` varchar(500) DEFAULT NULL,
  `display_order` tinyint(4) DEFAULT NULL,
  `menu_level` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`menu_id`,`menu_name`,`menu_url`,`memo`,`icon_path`,`parent_id`,`state`,`tree_code`,`display_order`,`menu_level`) values 
('1','仪表盘','/pages/jsp/login/index.jsp',NULL,'fa-tachometer',NULL,'1','/1',1,1),
('3','工作台',NULL,NULL,'fa-desktop',NULL,'1','/3',2,1),
('31','我的工单','/pages/jsp/workbench/workorder/myWorkOrder.jsp',NULL,NULL,'3','1','/3/31',1,2),
('32','待办事项','/pages/jsp/workbench/workorder/backlogWorkOrder.jsp',NULL,NULL,'3','1','/3/32',2,2),
('33','已办事项','/pages/jsp/workbench/workorder/participate.jsp',NULL,NULL,'3','1','/3/33',3,2),
('34','工单查询','/pages/jsp/workbench/workorder/workOrder.jsp',NULL,NULL,'3','1','/3/34',4,2),
('7','系统管理',NULL,NULL,'fa-cogs',NULL,'1','/7',3,1),
('71','用户信息','/pages/jsp/system/sysuser/sysUser.jsp','add,update,','','7','1','/7/71',2,2),
('72','组织结构','/pages/jsp/system/sysorg/sysOrg.jsp',NULL,NULL,'7','1','/7/72',3,2),
('73','角色信息','/pages/jsp/system/sysrole/sysRole.jsp',NULL,NULL,'7','1','/7/73',3,2),
('74','菜单管理','/pages/jsp/system/sysmenu/sysMenu.jsp',NULL,NULL,'7','1','/7/74',1,2),
('75','日志管理','/pages/jsp/system/log/logManage.jsp',NULL,NULL,'7','1','/7/75',5,2),
('76','流程管理','/pages/jsp/activiti/activitiModel.jsp',NULL,NULL,'7','1','/7/76',6,2),
('77','关联管理','/pages/jsp/activiti/flowManager.jsp',NULL,NULL,'7','1','/7/77',7,2),
('78','参数管理','/pages/jsp/system/sysglobalparam/sysGlobalParam.jsp',NULL,NULL,'7','1','/7/78',8,2),
('79','数据字典','/pages/jsp/system/syscode/sysCode.jsp',NULL,NULL,'7','1','/7/79',9,2),
('8','前台组件',NULL,NULL,'fa-wrench',NULL,'1','/8',4,1),
('81','表格','/pages/jsp/demo/grid.jsp',NULL,NULL,'8','1','/8/81',2,2),
('82','表单','/pages/jsp/demo/form.jsp',NULL,NULL,'8','1','/8/82',1,2),
('83','按钮及图标','/pages/jsp/demo/buttons.jsp',NULL,NULL,'8','1','/8/83',3,2),
('84','布局','/pages/jsp/demo/layout.jsp',NULL,NULL,'8','1','/8/84',4,2),
('85','iframe高度','/pages/jsp/demo/iframeHeight.jsp',NULL,NULL,'8','1','/8/85',5,2);

/*Table structure for table `sys_menu_operation` */

DROP TABLE IF EXISTS `sys_menu_operation`;

CREATE TABLE `sys_menu_operation` (
  `id` varchar(50) NOT NULL,
  `menu_id` varchar(50) DEFAULT NULL,
  `operation_name` varchar(50) DEFAULT NULL,
  `operation_code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_menu_operation` */

insert  into `sys_menu_operation`(`id`,`menu_id`,`operation_name`,`operation_code`) values 
('1','71','新增','add'),
('2','71','修改','update'),
('3','71','删除','delete');

/*Table structure for table `sys_op_log` */

DROP TABLE IF EXISTS `sys_op_log`;

CREATE TABLE `sys_op_log` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  `user_ip` varchar(32) DEFAULT NULL,
  `action_name` varchar(32) DEFAULT NULL,
  `method_name` varchar(32) DEFAULT NULL,
  `data_id` varchar(32) DEFAULT NULL,
  `op_time` varchar(32) DEFAULT NULL,
  `success` int(11) DEFAULT '0',
  `param` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_op_log` */

/*Table structure for table `sys_org` */

DROP TABLE IF EXISTS `sys_org`;

CREATE TABLE `sys_org` (
  `org_id` varchar(50) NOT NULL,
  `pid` varchar(50) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `tree_code` varchar(500) DEFAULT NULL,
  `display_order` tinyint(4) DEFAULT NULL,
  `orglevel` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_org` */

insert  into `sys_org`(`org_id`,`pid`,`name`,`memo`,`tree_code`,`display_order`,`orglevel`) values 
('79be0e1a-f42c-4be7-b996-a25e89c18667',NULL,'省公司',NULL,'/79be0e1a-f42c-4be7-b996-a25e89c18667',1,1);

/*Table structure for table `sys_permission` */

DROP TABLE IF EXISTS `sys_permission`;

CREATE TABLE `sys_permission` (
  `role_id` varchar(32) NOT NULL,
  `resource_id` varchar(32) NOT NULL,
  `auth_id` varchar(32) NOT NULL,
  `perm_key` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_permission` */

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `role_id` varchar(50) NOT NULL,
  `role_name` varchar(200) NOT NULL,
  `create_id` varchar(50) NOT NULL,
  `create_time` varchar(50) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_role` */

insert  into `sys_role`(`role_id`,`role_name`,`create_id`,`create_time`,`memo`) values 
('0','系统管理员','0',NULL,'系统管理'),
('1','工作流人员','0',NULL,NULL);

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `rm_id` varchar(100) NOT NULL,
  `role_id` varchar(100) DEFAULT NULL,
  `menu_id` varchar(100) DEFAULT NULL,
  `operations` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`rm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_role_menu` */

insert  into `sys_role_menu`(`rm_id`,`role_id`,`menu_id`,`operations`) values 
('02c612dc-4b68-442d-abbe-9acf8d91bd61','0','33',NULL),
('0390bfab-b834-4a41-bf80-ce397b970f01','0','32',NULL),
('03ac215c-88d2-4ff7-9af5-a3b2f4882675','1','34',NULL),
('05afa142-fdd2-4ae1-b063-ba879f65e2a0','1','75',NULL),
('08a59160-061b-45ab-b0ab-3ad019718166','0','84',NULL),
('0f7a09bb-e838-4f73-a81f-73546c1a7779','1','7',NULL),
('12ff164b-a7d6-471c-8a9d-5193e24cd27b','0','1',NULL),
('154c618b-083b-4ac0-81cb-405f20d0254d','1','31',NULL),
('15a60756-d135-47b7-bf84-6baefec33e1b','1','81',NULL),
('1b0ecc23-0ec5-423d-8b30-02db4079cfd1','0','82',NULL),
('27718f82-aedb-4526-ae28-1f0bd8e93df1','1','82',NULL),
('2af9f28e-8848-4b8f-9149-ca0f78687145','1','1',NULL),
('2ba6126c-6a8b-4d4f-9352-e1440c6bd1c5','0','73',NULL),
('369b0255-6f1a-4879-bcf7-e529c2b0a373','1','72',NULL),
('48b75010-2e4a-4288-ba21-26d8e150f717','1','78',NULL),
('496d7424-9873-4e2b-bff4-ffec1a3ffb6c','0','34',NULL),
('4b91345e-81e1-4e33-837e-47e70506367d','0','3',NULL),
('5b92e800-e679-4049-acc0-5fc919013a4e','0','76',NULL),
('6e4eec4d-bf89-4eb0-a8bf-68f83b5d9a83','0','78',NULL),
('6f562e6b-ae17-4744-a68f-afd362e6a93d','1','74',NULL),
('73a2459d-52fd-4588-95f7-74c7c5edfbc4','1','83',NULL),
('74526c5b-9443-45c6-9f56-4ae7b140c516','0','83',NULL),
('7704348a-aa92-487c-ba26-9dabb9de2c65','1','3',NULL),
('7c55a9a2-6a67-4ee4-918c-e62fa921fa08','0','74','add#'),
('7d03cf7f-d490-4043-9587-3f0e8c071cb5','0','81',NULL),
('8654e119-e8c3-44c4-895b-742fd806db5d','0','71','add#update#delete#'),
('88bf186a-359e-4e17-a0aa-97c36120991e','1','32',NULL),
('8f85fdce-dd30-4e92-8346-d56b6306938b','1','76',NULL),
('97740533-84b8-4b35-baf9-4e91ecdfcadc','0','75',NULL),
('9a9d3e66-d81e-41da-af61-6eba852465bf','0','8',NULL),
('b83d1e09-c39c-4cbb-8c2d-37872ae39420','1','85',NULL),
('bcbd4398-f7cb-44b3-a362-b65f8c4cb8ee','1','8',NULL),
('c167f0cd-80f1-4549-a0f0-4543035f9b26','0','79',NULL),
('c7d3f989-4fe5-46b3-9b7c-68f3a1d6c8f2','0','77',NULL),
('ce9f8f7a-dd17-4921-943b-f9325e24b751','0','31',NULL),
('e2f66fdc-3aaf-45dd-a226-9b3df723d877','0','72',NULL),
('e6359006-60b0-4c9f-a70a-29320417b12c','0','7',NULL),
('e87afa63-629c-41b3-bf10-c1027c8d211f','1','71','add#'),
('ee54df6a-10d9-4447-a9a5-74cad31f3d14','1','84',NULL),
('ef9f3f31-4df0-44bf-b910-bc7b800359fa','1','73',NULL),
('f2f48cb1-95a7-4c15-9a0e-eb4c7175bfe9','1','33',NULL);

/*Table structure for table `sys_role_user` */

DROP TABLE IF EXISTS `sys_role_user`;

CREATE TABLE `sys_role_user` (
  `ru_id` varchar(50) NOT NULL,
  `role_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `memo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ru_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_role_user` */

insert  into `sys_role_user`(`ru_id`,`role_id`,`user_id`,`memo`) values 
('09b6a88f-e2a0-414e-a0ab-916d23229e20','1','0',NULL),
('3bdedd0c-6637-4645-8700-b34625634faf','0','0',NULL);

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `user_id` varchar(50) NOT NULL,
  `create_id` varchar(32) DEFAULT NULL,
  `login_id` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `org_id` varchar(50) DEFAULT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_sex` varchar(1) DEFAULT NULL,
  `user_mobile` varchar(200) DEFAULT NULL,
  `user_telephone` varchar(200) DEFAULT NULL,
  `user_mail` varchar(200) DEFAULT NULL,
  `pwd_state` varchar(1) DEFAULT NULL,
  `create_time` varchar(50) DEFAULT NULL,
  `update_time` varchar(50) DEFAULT NULL,
  `user_level` varchar(1) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `emp_no` varchar(50) DEFAULT NULL,
  `user_state` varchar(1) DEFAULT NULL,
  `incharge_flag` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_user` */

insert  into `sys_user`(`user_id`,`create_id`,`login_id`,`password`,`org_id`,`user_name`,`user_sex`,`user_mobile`,`user_telephone`,`user_mail`,`pwd_state`,`create_time`,`update_time`,`user_level`,`memo`,`emp_no`,`user_state`,`incharge_flag`) values 
('0','0','admin','21232f297a57a5a743894a0e4a801fc3','79be0e1a-f42c-4be7-b996-a25e89c18667','超级管理员','1','13888888888',NULL,'admin@bonc.com.cn',NULL,NULL,NULL,NULL,NULL,NULL,'1',NULL);

/*Table structure for table `wf_flow_log` */

DROP TABLE IF EXISTS `wf_flow_log`;

CREATE TABLE `wf_flow_log` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `classname` varchar(200) NOT NULL,
  `state` varchar(32) NOT NULL,
  `flow_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `wf_flow_log` */

/*Table structure for table `wf_flow_resource` */

DROP TABLE IF EXISTS `wf_flow_resource`;

CREATE TABLE `wf_flow_resource` (
  `appid` varchar(32) NOT NULL,
  `deployid` varchar(32) NOT NULL,
  `processid` varchar(32) NOT NULL,
  `processname` varchar(1000) NOT NULL,
  `appclassname` varchar(500) NOT NULL,
  `memo` varchar(2000) NOT NULL,
  PRIMARY KEY (`appid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `wf_flow_resource` */

/*Table structure for table `wf_workorder` */

DROP TABLE IF EXISTS `wf_workorder`;

CREATE TABLE `wf_workorder` (
  `id` varchar(32) NOT NULL,
  `create_time` varchar(200) DEFAULT NULL,
  `creator_id` varchar(32) NOT NULL,
  `creator_name` varchar(200) DEFAULT NULL,
  `creator_org_id` varchar(32) DEFAULT NULL,
  `data_id` varchar(32) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `model` varchar(32) DEFAULT NULL,
  `conclusion` varchar(4000) DEFAULT NULL,
  `org_id` varchar(1000) NOT NULL,
  `assign_id` varchar(1000) NOT NULL,
  `contract_name` varchar(200) DEFAULT NULL,
  `rectify_require` varchar(2000) DEFAULT NULL,
  `rectify_deadline` varchar(200) DEFAULT NULL,
  `audit_cycle` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `type` varchar(200) DEFAULT NULL,
  `data_area_id` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `wf_workorder` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
