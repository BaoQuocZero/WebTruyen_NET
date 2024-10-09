
﻿// Repository/ThuocRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{

    public class ThuocRepository : RepositoryGeneric<THUOC>,IThuocRepository
    {
        private readonly MyDbContext _context;

        public ThuocRepository(MyDbContext context) : base(context)
        {
            _context = context;
        }

       
        public Task<THUOC> AddAsync(THUOC THUOC)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int maTruyen, int maTheLoai)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(int maTruyen, int maTheLoai)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<THUOC>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<THUOC> GetByIdAsync(int maTruyen, int maTheLoai)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(THUOC THUOC)
        {
            throw new NotImplementedException();
        }
    }
}
