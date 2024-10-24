namespace CustomFormApp.Server.Dto
{
    public class FormSubmissionDto
    {
        public int TemplateId { get; set; }
        public Dictionary<string, string> Answers { get; set; }
    }

}
