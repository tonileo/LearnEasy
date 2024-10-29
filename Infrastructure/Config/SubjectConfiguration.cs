using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasIndex(x => x.Name)
            .IsUnique();

        builder.HasOne(y => y.Category)
            .WithMany(z => z.Subjects)
            .HasForeignKey(f => f.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
