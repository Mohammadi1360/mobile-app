CREATE TABLE [dbo].[Town] (
  [TownCode] int IDENTITY(10000, 1) NOT NULL,
  [Shire] varchar(150) COLLATE Arabic_CI_AS NOT NULL,
  [City] varchar(150) COLLATE Arabic_CI_AS NOT NULL,
  [CZone] varchar(150) COLLATE Arabic_CI_AS NOT NULL,
  [Dehestan] varchar(150) COLLATE Arabic_CI_AS NOT NULL,
  [TownName] varchar(150) COLLATE Arabic_CI_AS NOT NULL,
  [Area] int NOT NULL,
  [NoOfFamily] int NOT NULL,
  [TotalPeople] int NOT NULL,
  [Dehyari] bit NOT NULL,
  [ShorayEslami] bit NOT NULL,
  [KhadamatCenter] bit NOT NULL,
  [TaavonCompany] bit NOT NULL,
  [PasgahEntezami] bit NOT NULL,
  [PaygahBasij] bit NOT NULL,
  [DrinkWater] bit NOT NULL,
  [Bargh] bit NOT NULL,
  [Gas] bit NOT NULL,
  [Hamam] bit NOT NULL,
  [BehdashtCenter] bit NOT NULL,
  [Pharmecy] bit NOT NULL,
  [BehdashtHome] bit NOT NULL,
  [Pezeshk] bit NOT NULL,
  [Dentist] bit NOT NULL,
  [DentMaker] bit NOT NULL,
  [Behyar] bit NOT NULL,
  [BehdashtYar] bit NOT NULL,
  [Behvarz] bit NOT NULL,
  [Dampezeshk] bit NOT NULL,
  [PostCube] bit NOT NULL,
  [PostOffice] bit NOT NULL,
  [Telgraph] bit NOT NULL,
  [Telephone] bit NOT NULL,
  [EbtedaeiSchool] bit NULL,
  [RahnamaeiSchool] bit NULL,
  [Dabirestan] bit NULL,
  [Bank] bit NULL,
  [AsphaltRoad] bit NULL,
  [hasTrashCollector] bit NULL,
  CONSTRAINT [PK_Town2] PRIMARY KEY CLUSTERED ([TownCode])
)
ON [PRIMARY]
GO

EXEC sp_addextendedproperty 'MS_Description', N'òœ —Ê” «', 'user', 'dbo', 'table', 'Town', 'column', 'TownCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'«” «‰', 'user', 'dbo', 'table', 'Town', 'column', 'Shire'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘Â—” «‰', 'user', 'dbo', 'table', 'Town', 'column', 'City'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»Œ‘', 'user', 'dbo', 'table', 'Town', 'column', 'CZone'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œÂ” «‰', 'user', 'dbo', 'table', 'Town', 'column', 'Dehestan'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰«„ —Ê” «', 'user', 'dbo', 'table', 'Town', 'column', 'TownName'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„”«Õ ', 'user', 'dbo', 'table', 'Town', 'column', 'Area'
GO

EXEC sp_addextendedproperty 'MS_Description', N' ⁄œ«œ Œ«‰Ê«—', 'user', 'dbo', 'table', 'Town', 'column', 'NoOfFamily'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Ã„⁄Ì ', 'user', 'dbo', 'table', 'Town', 'column', 'TotalPeople'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œÂÌ«—Ì', 'user', 'dbo', 'table', 'Town', 'column', 'Dehyari'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘Ê—«Ì «”·«„Ì', 'user', 'dbo', 'table', 'Town', 'column', 'ShorayEslami'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„—ò“ Œœ„« ', 'user', 'dbo', 'table', 'Town', 'column', 'KhadamatCenter'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘—ò   ⁄«Ê‰Ì', 'user', 'dbo', 'table', 'Town', 'column', 'TaavonCompany'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Å«”ê«Â «‰ Ÿ«„Ì', 'user', 'dbo', 'table', 'Town', 'column', 'PasgahEntezami'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Å«Ìê«Â »”ÌÃ', 'user', 'dbo', 'table', 'Town', 'column', 'PaygahBasij'
GO

EXEC sp_addextendedproperty 'MS_Description', N'¬» ¬‘«„Ìœ‰Ì', 'user', 'dbo', 'table', 'Town', 'column', 'DrinkWater'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»—ﬁ', 'user', 'dbo', 'table', 'Town', 'column', 'Bargh'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ê«“', 'user', 'dbo', 'table', 'Town', 'column', 'Gas'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Õ„«„ ⁄„Ê„Ì', 'user', 'dbo', 'table', 'Town', 'column', 'Hamam'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„—ò“ »Âœ«” ', 'user', 'dbo', 'table', 'Town', 'column', 'BehdashtCenter'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œ«—ÊŒ«‰Â', 'user', 'dbo', 'table', 'Town', 'column', 'Pharmecy'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Œ«‰Â »Âœ«‘ ', 'user', 'dbo', 'table', 'Town', 'column', 'BehdashtHome'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Å“‘ò', 'user', 'dbo', 'table', 'Town', 'column', 'Pezeshk'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œ‰œ«‰Å“‘ò', 'user', 'dbo', 'table', 'Town', 'column', 'Dentist'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œ‰œ«‰”«“', 'user', 'dbo', 'table', 'Town', 'column', 'DentMaker'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»ÂÌ«—', 'user', 'dbo', 'table', 'Town', 'column', 'Behyar'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»Âœ«‘  Ì«—', 'user', 'dbo', 'table', 'Town', 'column', 'BehdashtYar'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»ÂÊ—“', 'user', 'dbo', 'table', 'Town', 'column', 'Behvarz'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œ«„Å“‘ò', 'user', 'dbo', 'table', 'Town', 'column', 'Dampezeshk'
GO

EXEC sp_addextendedproperty 'MS_Description', N'’‰œﬁ Å” Ì', 'user', 'dbo', 'table', 'Town', 'column', 'PostCube'
GO

EXEC sp_addextendedproperty 'MS_Description', N'«œ«—Â Å” ', 'user', 'dbo', 'table', 'Town', 'column', 'PostOffice'
GO

EXEC sp_addextendedproperty 'MS_Description', N' ·ê—«›', 'user', 'dbo', 'table', 'Town', 'column', 'Telgraph'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„—ò“  ·›‰', 'user', 'dbo', 'table', 'Town', 'column', 'Telephone'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„œ—”Â «» œ«ÌÌ', 'user', 'dbo', 'table', 'Town', 'column', 'EbtedaeiSchool'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„œ—”Â —«Â‰„«ÌÌ', 'user', 'dbo', 'table', 'Town', 'column', 'RahnamaeiSchool'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œ»Ì—” «‰', 'user', 'dbo', 'table', 'Town', 'column', 'Dabirestan'
GO

EXEC sp_addextendedproperty 'MS_Description', N'»«‰ò', 'user', 'dbo', 'table', 'Town', 'column', 'Bank'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Ã«œÂ ¬”›«· ', 'user', 'dbo', 'table', 'Town', 'column', 'AsphaltRoad'
GO

EXEC sp_addextendedproperty 'MS_Description', N'«„ò«‰«  Ã„⁄ ¬Ê—Ì Å” „«‰œ', 'user', 'dbo', 'table', 'Town', 'column', 'hasTrashCollector'
GO
