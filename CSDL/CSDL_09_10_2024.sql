/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2012                    */
/* Created on:     10/9/2024 9:06:37 PM                         */
/*==============================================================*/

CREATE DATABASE QUANLY_TRUYEN
go
USE QUANLY_TRUYEN
go
if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANG_TAC') and o.name = 'FK_SANG_TAC_SANG_TAC_TAC_GIA')
alter table SANG_TAC
   drop constraint FK_SANG_TAC_SANG_TAC_TAC_GIA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANG_TAC') and o.name = 'FK_SANG_TAC_SANG_TAC2_TRUYEN_T')
alter table SANG_TAC
   drop constraint FK_SANG_TAC_SANG_TAC2_TRUYEN_T
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUOC') and o.name = 'FK_THUOC_THUOC_TRUYEN_T')
alter table THUOC
   drop constraint FK_THUOC_THUOC_TRUYEN_T
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUOC') and o.name = 'FK_THUOC_THUOC2_THE_LOAI')
alter table THUOC
   drop constraint FK_THUOC_THUOC2_THE_LOAI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANG_TAC')
            and   name  = 'SANG_TAC2_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANG_TAC.SANG_TAC2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANG_TAC')
            and   name  = 'SANG_TAC_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANG_TAC.SANG_TAC_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SANG_TAC')
            and   type = 'U')
   drop table SANG_TAC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TAC_GIA')
            and   type = 'U')
   drop table TAC_GIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THE_LOAI')
            and   type = 'U')
   drop table THE_LOAI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUOC')
            and   name  = 'THUOC2_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUOC.THUOC2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUOC')
            and   name  = 'THUOC_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUOC.THUOC_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THUOC')
            and   type = 'U')
   drop table THUOC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TRUYEN_TRANH')
            and   type = 'U')
   drop table TRUYEN_TRANH
go

/*==============================================================*/
/* Table: SANG_TAC                                              */
/*==============================================================*/
create table SANG_TAC (
   MA_TAC_GIA           int                  not null,
   MA_TRUYEN            int                  not null,
   constraint PK_SANG_TAC primary key (MA_TAC_GIA, MA_TRUYEN)
)
go

/*==============================================================*/
/* Index: SANG_TAC_FK                                           */
/*==============================================================*/
create index SANG_TAC_FK on SANG_TAC (
MA_TAC_GIA ASC
)
go

/*==============================================================*/
/* Index: SANG_TAC2_FK                                          */
/*==============================================================*/
create index SANG_TAC2_FK on SANG_TAC (
MA_TRUYEN ASC
)
go

/*==============================================================*/
/* Table: TAC_GIA                                               */
/*==============================================================*/
create table TAC_GIA (
   MA_TAC_GIA           int  IDENTITY(1,1) not null,
   TEN_TAC_GIA          nvarchar(255)         null,
   GIOI_TINH_TAC_GIA    nvarchar(50)          null,
   QUOC_GIA_TAC_GIA     nvarchar(255)         null,
   constraint PK_TAC_GIA primary key (MA_TAC_GIA)
)
go

/*==============================================================*/
/* Table: THE_LOAI                                              */
/*==============================================================*/
create table THE_LOAI (
   MA_THE_LOAI          int     IDENTITY(1,1) not null,
   TEN_THE_LOAI         nvarchar(255)         null,
   CHO_GIOI_TINH        nvarchar(50)          null,
   constraint PK_THE_LOAI primary key (MA_THE_LOAI)
)
go

/*==============================================================*/
/* Table: THUOC                                                 */
/*==============================================================*/
create table THUOC (
   MA_TRUYEN            int                  not null,
   MA_THE_LOAI          int                  not null,
   constraint PK_THUOC primary key (MA_TRUYEN, MA_THE_LOAI)
)
go

/*==============================================================*/
/* Index: THUOC_FK                                              */
/*==============================================================*/
create index THUOC_FK on THUOC (
MA_TRUYEN ASC
)
go

/*==============================================================*/
/* Index: THUOC2_FK                                             */
/*==============================================================*/
create index THUOC2_FK on THUOC (
MA_THE_LOAI ASC
)
go

/*==============================================================*/
/* Table: TRUYEN_TRANH                                          */
/*==============================================================*/
create table TRUYEN_TRANH (
   MA_TRUYEN            int   IDENTITY(1,1) not null,
   TEN_TRUYEN           nvarchar(255)         null,
   ANH_BIA              nvarchar(2000)        null,
   NOI_DUNG_TRUYEN      nvarchar(4000)        null,
   TINH_TRANG           nvarchar(50)          null,
   MO_TA_TRUYEN         nvarchar(4000)        null,
   GHI_CHU_TRUYEN       nvarchar(4000)        null,
   constraint PK_TRUYEN_TRANH primary key (MA_TRUYEN)
)
go

alter table SANG_TAC
   add constraint FK_SANG_TAC_SANG_TAC_TAC_GIA foreign key (MA_TAC_GIA)
      references TAC_GIA (MA_TAC_GIA)
go

alter table SANG_TAC
   add constraint FK_SANG_TAC_SANG_TAC2_TRUYEN_T foreign key (MA_TRUYEN)
      references TRUYEN_TRANH (MA_TRUYEN)
go

alter table THUOC
   add constraint FK_THUOC_THUOC_TRUYEN_T foreign key (MA_TRUYEN)
      references TRUYEN_TRANH (MA_TRUYEN)
go

alter table THUOC
   add constraint FK_THUOC_THUOC2_THE_LOAI foreign key (MA_THE_LOAI)
      references THE_LOAI (MA_THE_LOAI)
go

/*==============================================================*/
/* Thêm dữ liệu vào bảng TAC_GIA                                 */
/*==============================================================*/
INSERT INTO TAC_GIA (TEN_TAC_GIA, GIOI_TINH_TAC_GIA, QUOC_GIA_TAC_GIA)
VALUES 
    (N'Nguyễn Văn A', N'Nam', N'Việt Nam'),
    (N'Lê Thị B', N'Nữ', N'Việt Nam'),
    (N'John Doe', N'Nam', N'Mỹ'),
    (N'Jane Smith', N'Nữ', N'Anh');
GO

/*==============================================================*/
/* Thêm dữ liệu vào bảng THE_LOAI                                */
/*==============================================================*/
INSERT INTO THE_LOAI (TEN_THE_LOAI, CHO_GIOI_TINH)
VALUES 
    (N'Hành động', N'Tất cả'),
    (N'Phiêu lưu', N'Tất cả'),
    (N'Hài hước', N'Nữ'),
    (N'Giả tưởng', N'Tất cả'),
    (N'Lãng mạn', N'Nữ');
GO

/*==============================================================*/
/* Thêm dữ liệu vào bảng TRUYEN_TRANH                           */
/*==============================================================*/
INSERT INTO TRUYEN_TRANH (TEN_TRUYEN, ANH_BIA, NOI_DUNG_TRUYEN, TINH_TRANG, MO_TA_TRUYEN, GHI_CHU_TRUYEN)
VALUES 
    (N'Tiểu Thuyết 1', N'https://example.com/image1.jpg', N'Nội dung tiếng Việt có dấu.', N'Hoàn thành', N'Mô tả chi tiết về truyện 1.', N'Ghi chú bổ sung 1.'),
    (N'Tiểu Thuyết 2', N'https://example.com/image2.jpg', N'Nội dung tiếng Việt có dấu và dài hơn.', N'Đang tiến hành', N'Mô tả chi tiết về truyện 2.', N'Ghi chú bổ sung 2.'),
    (N'Adventure Story', N'https://example.com/image3.jpg', N'Content in English.', N'Hoàn thành', N'Detailed description of story 3.', N'Additional notes 3.'),
    (N'Giả Tưởng Vũ Trụ', N'https://example.com/image4.jpg', N'Nội dung giả tưởng phong phú.', N'Hoàn thành', N'Mô tả chi tiết về truyện 4.', N'Ghi chú bổ sung 4.');
GO

/*==============================================================*/
/* Thêm dữ liệu vào bảng SANG_TAC                                */
/*==============================================================*/
INSERT INTO SANG_TAC (MA_TAC_GIA, MA_TRUYEN)
VALUES 
    (1, 1), -- Nguyễn Văn A sáng tác Tiểu Thuyết 1
    (2, 2), -- Lê Thị B sáng tác Tiểu Thuyết 2
    (3, 3), -- John Doe sáng tác Adventure Story
    (4, 4), -- Jane Smith sáng tác Giả Tưởng Vũ Trụ
    (1, 3); -- Nguyễn Văn A cũng sáng tác Adventure Story
GO

/*==============================================================*/
/* Thêm dữ liệu vào bảng THUOC                                   */
/*==============================================================*/
INSERT INTO THUOC (MA_TRUYEN, MA_THE_LOAI)
VALUES 
    (1, 1), -- Tiểu Thuyết 1 thuộc Hành động
    (1, 2), -- Tiểu Thuyết 1 thuộc Phiêu lưu
    (2, 2), -- Tiểu Thuyết 2 thuộc Phiêu lưu
    (2, 5), -- Tiểu Thuyết 2 thuộc Lãng mạn
    (3, 1), -- Adventure Story thuộc Hành động
    (3, 4), -- Adventure Story thuộc Giả tưởng
    (4, 4), -- Giả Tưởng Vũ Trụ thuộc Giả tưởng
    (4, 3); -- Giả Tưởng Vũ Trụ thuộc Hài hước
GO

