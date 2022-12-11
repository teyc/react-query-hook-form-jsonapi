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
    [Migration("20221209063854_LoanDto")]
    partial class LoanDto
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("ContactDtoLoanDto", b =>
                {
                    b.Property<int>("BorrowersId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LoansId")
                        .HasColumnType("INTEGER");

                    b.HasKey("BorrowersId", "LoansId");

                    b.HasIndex("LoansId");

                    b.ToTable("ContactDtoLoanDto");
                });

            modelBuilder.Entity("SampleWeb.JsonApiResource.ContactDto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("ContactId");

                    b.Property<string>("CreatedDate")
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

                    b.Property<string>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ModifiedUserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("NextOnlineMeeting")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Contact");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedDate = "2022-12-09T16:38:54.5788810+10:00",
                            CreatedUserId = "1",
                            DateOfBirth = new DateOnly(1985, 3, 5),
                            FirstName = "Max",
                            IsActive = 1,
                            LastName = "Melwell",
                            NextOnlineMeeting = "2022-12-25T13:00:00.0000000+10:00"
                        });
                });

            modelBuilder.Entity("SampleWeb.JsonApiResource.LoanDto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedUserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("LoanAmount")
                        .HasColumnType("TEXT");

                    b.Property<string>("ModifiedUserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Loan");
                });

            modelBuilder.Entity("ContactDtoLoanDto", b =>
                {
                    b.HasOne("SampleWeb.JsonApiResource.ContactDto", null)
                        .WithMany()
                        .HasForeignKey("BorrowersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SampleWeb.JsonApiResource.LoanDto", null)
                        .WithMany()
                        .HasForeignKey("LoansId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}