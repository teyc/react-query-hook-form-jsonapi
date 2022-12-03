﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SampleWeb.DataAccess;

#nullable disable

namespace SampleWeb.Migrations
{
    [DbContext(typeof(MyCrmDbContext))]
    [Migration("20221126235845_contacts")]
    partial class contacts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("SampleWeb.JsonApiResource.ContactDto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("ContactId");

                    b.Property<DateTimeOffset?>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedUserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly?>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<int?>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ModifiedUserId")
                        .HasColumnType("TEXT");

                    b.Property<DateTimeOffset?>("NextOnlineMeeting")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Contact");
                });
#pragma warning restore 612, 618
        }
    }
}
