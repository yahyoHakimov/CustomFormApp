namespace CustomFormApp.Server.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; } // e.g., "text", "integer", "checkbox"
        public string Description { get; set; }
        public bool IsRequired { get; set; }
    }
}
