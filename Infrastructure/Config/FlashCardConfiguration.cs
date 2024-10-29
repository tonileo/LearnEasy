using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class FlashCardConfiguration : IEntityTypeConfiguration<FlashCard>
{
    public void Configure(EntityTypeBuilder<FlashCard> builder)
    {
        builder.HasOne(a => a.Subject)
            .WithMany(b => b.FlashCards)
            .HasForeignKey(c => c.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(d => d.Tag)
            .WithMany(e => e.FlashCards)
            .HasForeignKey(f => f.TagId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
