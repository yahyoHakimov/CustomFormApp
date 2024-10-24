namespace CustomFormApp.Server.Dto
{
    public class FormResponseDto
    {
        public int UserId { get; set; }
        public DateTime SubmittedAt { get; set; }
        public Dictionary<string, string> SubmittedData { get; set; }
    }

}
