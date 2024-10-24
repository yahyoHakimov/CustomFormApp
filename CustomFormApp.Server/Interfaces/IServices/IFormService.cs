using CustomFormApp.Server.Dto;

namespace CustomFormApp.Server.Interfaces.IServices
{
    public interface IFormService
    {
        Task SubmitFormAsync(int templateId, FormSubmissionDto submissionDto);
        Task<List<FormResponseDto>> GetFormResponsesAsync(int templateId);
    }

}
