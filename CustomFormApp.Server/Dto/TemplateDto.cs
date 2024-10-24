namespace CustomFormApp.Server.Dto
{
    public class TemplateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Topic { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Tags { get; set; }
        public bool IsPublic { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
