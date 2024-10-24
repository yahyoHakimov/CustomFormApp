using AutoMapper;
using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Models;

namespace CustomFormApp.Server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Template, TemplateDto>().ReverseMap();
        }
    }
}
