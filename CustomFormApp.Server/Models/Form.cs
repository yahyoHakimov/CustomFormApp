namespace CustomFormApp.Server.Models
{
    public class Form
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public int UserId { get; set; }
        public string SubmittedData { get; set; } // JSON of the answers
        public DateTime SubmittedAt { get; set; }
    }

}
