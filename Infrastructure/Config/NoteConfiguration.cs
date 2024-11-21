using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.HasIndex(a => a.Name)
            .IsUnique();

        builder
            .HasOne(b => b.Subject)
            .WithMany(c => c.Notes)
            .HasForeignKey(d => d.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
