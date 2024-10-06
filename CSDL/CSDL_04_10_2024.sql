/*==============================================================*/
/* DBMS name:      SQL Server                                   */
/* Created on:     10/4/2024 9:29:11 PM                         */
/*==============================================================*/

/*==============================================================*/
/* DROP EXISTING TABLES                                         */
/*==============================================================*/

CREATE DATABASE QUANLY_SACH
USE QUANLY_SACH

/* Drop bảng phụ thuộc trước để tránh lỗi khi DROP */
DROP TABLE IF EXISTS SANG_TAC;
DROP TABLE IF EXISTS THUOC;
DROP TABLE IF EXISTS TRUYEN_TRANH;
DROP TABLE IF EXISTS THE_LOAI;
DROP TABLE IF EXISTS TAC_GIA;

/*==============================================================*/
/* TABLE: TAC_GIA                                               */
/*==============================================================*/
CREATE TABLE TAC_GIA
(
    MA_TAC_GIA           INT NOT NULL PRIMARY KEY,
    TEN_TAC_GIA          VARCHAR(255),
    GIOI_TINH_TAC_GIA    VARCHAR(50),
    QUOC_GIA_TAC_GIA     VARCHAR(255)
);

INSERT INTO TAC_GIA (MA_TAC_GIA, TEN_TAC_GIA, GIOI_TINH_TAC_GIA, QUOC_GIA_TAC_GIA)
VALUES (1, 'Nhân', 'Nam', 'Việt Nam');

/*==============================================================*/
/* TABLE: TRUYEN_TRANH                                          */
/*==============================================================*/
CREATE TABLE TRUYEN_TRANH
(
    MA_TRUYEN            INT NOT NULL PRIMARY KEY,
    TEN_TRUYEN           VARCHAR(5000),
    ANH_BIA              VARCHAR(5000),
    NOI_DUNG_TRUYEN      VARCHAR(5000),
    TINH_TRANG           VARCHAR(50),
    MO_TA_TRUYEN         VARCHAR(5000),
    GHI_CHU_TRUYEN       VARCHAR(5000)
);

INSERT INTO TRUYEN_TRANH (MA_TRUYEN, TEN_TRUYEN, ANH_BIA, NOI_DUNG_TRUYEN ,TINH_TRANG, MO_TA_TRUYEN, GHI_CHU_TRUYEN)
VALUES (1, 'ABC', '', 'Comment', 'Còn', 'Truyện sách', 'Tiểu thuyết');

/*==============================================================*/
/* TABLE: THE_LOAI                                              */
/*==============================================================*/
CREATE TABLE THE_LOAI
(
    MA_THE_LOAI          INT NOT NULL PRIMARY KEY,
    TEN_THE_LOAI         VARCHAR(255),
    CHO_GIOI_TINH        VARCHAR(50)
);

/*==============================================================*/
/* TABLE: SANG_TAC                                              */
/*==============================================================*/
CREATE TABLE SANG_TAC
(
    MA_TAC_GIA           INT NOT NULL,
    MA_TRUYEN            INT NOT NULL,
    PRIMARY KEY (MA_TAC_GIA, MA_TRUYEN)
);

/*==============================================================*/
/* TABLE: THUOC                                                 */
/*==============================================================*/
CREATE TABLE THUOC
(
    MA_TRUYEN            INT NOT NULL,
    MA_THE_LOAI          INT NOT NULL,
    PRIMARY KEY (MA_TRUYEN, MA_THE_LOAI)
);

/*==============================================================*/
/* ADD FOREIGN KEY CONSTRAINTS                                 */
/*==============================================================*/

/* Ràng buộc khóa ngoại cho bảng SANG_TAC */
ALTER TABLE SANG_TAC 
    ADD CONSTRAINT FK_SANG_TAC 
    FOREIGN KEY (MA_TAC_GIA)
    REFERENCES TAC_GIA (MA_TAC_GIA) 
    ON DELETE NO ACTION;

/* Ràng buộc khóa ngoại thứ hai cho bảng SANG_TAC */
ALTER TABLE SANG_TAC 
    ADD CONSTRAINT FK_SANG_TAC2 
    FOREIGN KEY (MA_TRUYEN)
    REFERENCES TRUYEN_TRANH (MA_TRUYEN) 
    ON DELETE NO ACTION;

/* Ràng buộc khóa ngoại cho bảng THUOC */
ALTER TABLE THUOC 
    ADD CONSTRAINT FK_THUOC 
    FOREIGN KEY (MA_TRUYEN)
    REFERENCES TRUYEN_TRANH (MA_TRUYEN) 
    ON DELETE NO ACTION;

/* Ràng buộc khóa ngoại thứ hai cho bảng THUOC */
ALTER TABLE THUOC 
    ADD CONSTRAINT FK_THUOC2 
    FOREIGN KEY (MA_THE_LOAI)
    REFERENCES THE_LOAI (MA_THE_LOAI) 
    ON DELETE NO ACTION;