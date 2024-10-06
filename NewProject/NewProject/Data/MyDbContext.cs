using Microsoft.EntityFrameworkCore;
using NewProject.Models;
using System;

namespace NewProject.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public DbSet<SANG_TAC> SANG_TACs { get; set; }
        public DbSet<TRUYEN_TRANH> TRUYEN_TRANHs { get; set; }
        public DbSet<TAC_GIA> TAC_GIAs { get; set; }
        public DbSet<THE_LOAI> THE_LOAIs { get; set; }
        public DbSet<THUOC> THUOCs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SANG_TAC>().ToTable("SANG_TAC");
            modelBuilder.Entity<TAC_GIA>().ToTable("TAC_GIA");
            modelBuilder.Entity<TRUYEN_TRANH>().ToTable("TRUYEN_TRANH");
            modelBuilder.Entity<THUOC>().ToTable("THUOC");
            modelBuilder.Entity<THE_LOAI>().ToTable("THE_LOAI");
            // Khóa chính phức hợp cho SANG_TAC
            modelBuilder.Entity<SANG_TAC>()
                .HasKey(st => new { st.MA_TAC_GIA, st.MA_TRUYEN });

            // Thiết lập mối quan hệ giữa SANG_TAC và TAC_GIA (N-1)
            modelBuilder.Entity<SANG_TAC>()
                .HasOne(st => st.TAC_GIA)
                .WithMany(tg => tg.SANG_TACs)
                .HasForeignKey(st => st.MA_TAC_GIA);

            // Thiết lập mối quan hệ giữa SANG_TAC và TRUYEN_TRANH (N-1)
            modelBuilder.Entity<SANG_TAC>()
                .HasOne(st => st.TRUYEN_TRANH)
                .WithMany(tt => tt.SANG_TACs)
                .HasForeignKey(st => st.MA_TRUYEN);









            // Thiết lập mối quan hệ giữa THE_LOAI và TRUYEN_TRANH (N-1) X sai
            // Cấu hình bảng THE_LOAI
            modelBuilder.Entity<THE_LOAI>(entity =>
            {
                entity.HasKey(e => e.MA_THE_LOAI);
                entity.Property(e => e.TEN_THE_LOAI).HasMaxLength(255).IsRequired();
                entity.Property(e => e.CHO_GIOI_TINH).HasMaxLength(50);
            });

            modelBuilder.Entity<THUOC>()
                .HasKey(st => new { st.MA_THE_LOAI, st.MA_TRUYEN });

            // Thiết lập mối quan hệ giữa SANG_TAC và TAC_GIA (N-1)
            modelBuilder.Entity<THUOC>()
                .HasOne(st => st.THE_LOAI)
                .WithMany(tg => tg.THUOCs)
                .HasForeignKey(st => st.MA_THE_LOAI);

            // Thiết lập mối quan hệ giữa SANG_TAC và TRUYEN_TRANH (N-1)
            modelBuilder.Entity<THUOC>()
                .HasOne(st => st.TRUYEN_TRANH)
                .WithMany(tt => tt.THUOCs)
                .HasForeignKey(st => st.MA_TRUYEN);








        }
    }
}
