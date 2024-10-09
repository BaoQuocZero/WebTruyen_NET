/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/2/2024 9:04:52 PM                         */
/*==============================================================*/


drop table if exists SANG_TAC;

drop table if exists TAC_GIA;

drop table if exists THE_LOAI;

drop table if exists TRUYEN_TRANH;

/*==============================================================*/
/* Table: SANG_TAC                                              */
/*==============================================================*/
create table SANG_TAC
(
   MA_TAC_GIA           int not null,
   MA_TRUYEN            int not null,
   primary key (MA_TAC_GIA, MA_TRUYEN)
);

/*==============================================================*/
/* Table: TAC_GIA                                               */
/*==============================================================*/
create table TAC_GIA
(
   MA_TAC_GIA           int not null,
   TEN_TAC_GIA          varchar(255),
   GIOI_TINH_TAC_GIA    varchar(50),
   QUOC_GIA_TAC_GIA     varchar(255),
   primary key (MA_TAC_GIA)
);

/*==============================================================*/
/* Table: THE_LOAI                                              */
/*==============================================================*/
create table THE_LOAI
(
   MA_THE_LOAI          int not null,
   MA_TRUYEN            int,
   TEN_THE_LOAI         varchar(255),
   CHO_GIOI_TINH        varchar(50),
   primary key (MA_THE_LOAI)
);

/*==============================================================*/
/* Table: TRUYEN_TRANH                                          */
/*==============================================================*/
create table TRUYEN_TRANH
(
   MA_TRUYEN            int not null,
   TEN_TRUYEN           text,
   ANH_BIA              text,
   NOI_DUNG_TRUYEN      text,
   TINH_TRANG           varchar(50),
   MO_TA_TRUYEN         text,
   GHI_CHU_TRUYEN       text,
   primary key (MA_TRUYEN)
);

alter table SANG_TAC add constraint FK_SANG_TAC foreign key (MA_TAC_GIA)
      references TAC_GIA (MA_TAC_GIA) on delete restrict on update restrict;

alter table SANG_TAC add constraint FK_SANG_TAC2 foreign key (MA_TRUYEN)
      references TRUYEN_TRANH (MA_TRUYEN) on delete restrict on update restrict;

alter table THE_LOAI add constraint FK_THUOC foreign key (MA_TRUYEN)
      references TRUYEN_TRANH (MA_TRUYEN) on delete restrict on update restrict;

