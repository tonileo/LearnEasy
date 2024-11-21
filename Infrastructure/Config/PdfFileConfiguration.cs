using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class PdfFileConfiguration : IEntityTypeConfiguration<PdfFile>
{
    public void Configure(EntityTypeBuilder<PdfFile> builder)
    {
        builder.HasIndex(a => a.Name)
            .IsUnique();

        builder
            .HasOne(b => b.Subject)
            .WithMany(c => c.PdfFiles)
            .HasForeignKey(d => d.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
