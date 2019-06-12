CREATE TABLE  map_search (
TEXTLABEL  VARCHAR(200),
CITY VARCHAR(100),
DISTRICT VARCHAR(100),
PROVINCE VARCHAR(200),
TYPE INTEGER,
SUBTYPE INTEGER,
ADDRESS VARCHAR(1000),
POINT  VARCHAR(100),
UID   VARCHAR(100),
IMAGEURL VARCHAR(500)
)

CREATE TABLE  map_bd_search (
TEXTLABEL  VARCHAR(200),
CITY VARCHAR(100),
ORG_ID VARCHAR(50),
ADDRESS VARCHAR(1000),
POINT  VARCHAR(100),
UID   VARCHAR(100) NOT NULL,
IMAGEURL VARCHAR(100),
LNG DOUBLE,
LAT DOUBLE,
PRIMARY KEY (UID)
)

CREATE TABLE grid_user_select
(
login_id varchar(32) DEFAULT NULL,
 user_name varchar(200) DEFAULT NULL,
password varchar(32) DEFAULT NULL,
 user_sex varchar(1) DEFAULT NULL,
  user_mobile varchar(200) DEFAULT NULL
)
 

CREATE TABLE grid_detail (
org_id varchar(50) NOT NULL,
type_id varchar(50) NOT NULL,
shape CLOB ,
color  varchar(100) NOT NULL,
PRIMARY KEY (org_id),
maxlng DOUBLE,
minlng DOUBLE,
maxlat DOUBLE,
minlat DOUBLE
)

CREATE TABLE grid_type(
type_id varchar(50) NOT NULL,
type_name varchar(100) NOT NULL,
PRIMARY KEY (type_id)
)


CREATE TABLE sys_org_detail (
org_id varchar(50) NOT NULL,
shape CLOB ,
maxlng DOUBLE,
minlng DOUBLE,
maxlat DOUBLE,
minlat DOUBLE
)