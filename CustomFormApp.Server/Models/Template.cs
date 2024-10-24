using System.ComponentModel.DataAnnotations;

namespace CustomFormApp.Server.Models
{
    public class Template
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        public List<Question> Questions { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string Topic { get; set; }

        public string ImageUrl { get; set; }

        public List<string> Tags { get; set; } = new List<string>();

        [Required]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public bool IsPublic { get; set; } = true;
    }
}
