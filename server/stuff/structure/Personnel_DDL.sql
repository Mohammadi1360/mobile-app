CREATE TABLE [dbo].[Personnel] (
  [PersonCode] numeric(18, 0) NOT NULL,
  [f_TownCode] int NOT NULL,
  [firstName] varchar(50) COLLATE Arabic_CI_AS NOT NULL,
  [lastName] varchar(70) COLLATE Arabic_CI_AS NOT NULL,
  [fatherName] varchar(50) COLLATE Arabic_CI_AS NOT NULL,
  [certificateNo] varchar(20) COLLATE Arabic_CI_AS NULL,
  [melliCode] varchar(20) COLLATE Arabic_CI_AS NULL,
  [sex] varchar(10) COLLATE Arabic_CI_AS NOT NULL,
  [address] varchar(120) COLLATE Arabic_CI_AS NULL,
  [tel] varchar(20) COLLATE Arabic_CI_AS NULL,
  [mobile] varchar(20) COLLATE Arabic_CI_AS NULL,
  [bedehkar] money CONSTRAINT [DF_Personnel_bedehkar] DEFAULT 0 NULL,
  [zobaleFlag] bit CONSTRAINT [DF_Personnel_ZobaleFlag] DEFAULT 1 NULL,
  [f_NextPersonCode] numeric(18, 0) NULL,
  [f_TrashAmountID] int NOT NULL,
  [f_TownStreetID] int NOT NULL,
  [OwnerType] varchar(50) COLLATE Arabic_CI_AS NULL,
  [Job] varchar(100) COLLATE Arabic_CI_AS NULL,
  [BuildingDocumentNo] varchar(50) COLLATE Arabic_CI_AS NULL,
  CONSTRAINT [PK_Personnel] PRIMARY KEY CLUSTERED ([PersonCode], [f_TownCode]),
  CONSTRAINT [FK_Personnel_Town] FOREIGN KEY ([f_TownCode]) 
  REFERENCES [dbo].[Town] ([TownCode]) 
  ON UPDATE CASCADE
  ON DELETE NO ACTION,
  CONSTRAINT [FK_Personnel_TownStreets] FOREIGN KEY ([f_TownStreetID], [f_TownCode]) 
  REFERENCES [dbo].[TownStreets] ([TownStreetID], [f_TownCode]) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION,
  CONSTRAINT [FK_Personnel_TrashAmount] FOREIGN KEY ([f_TrashAmountID], [f_TownCode]) 
  REFERENCES [dbo].[TrashAmount] ([TrashAmountID], [f_TownCode]) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
ON [PRIMARY]
GO

EXEC sp_addextendedproperty 'MS_Description', N'ﬂœ «‘ —«ﬂ', 'user', 'dbo', 'table', 'Personnel', 'column', 'PersonCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ﬂœ ‘Â—', 'user', 'dbo', 'table', 'Personnel', 'column', 'f_TownCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰«„', 'user', 'dbo', 'table', 'Personnel', 'column', 'firstName'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰«„ Œ«‰Ê«œêÌ', 'user', 'dbo', 'table', 'Personnel', 'column', 'lastName'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰«„ Åœ—', 'user', 'dbo', 'table', 'Personnel', 'column', 'fatherName'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘„«—Â ‘‰«”‰«„Â', 'user', 'dbo', 'table', 'Personnel', 'column', 'certificateNo'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ﬂœ „·Ì', 'user', 'dbo', 'table', 'Personnel', 'column', 'melliCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'Ã‰”Ì ', 'user', 'dbo', 'table', 'Personnel', 'column', 'sex'
GO

EXEC sp_addextendedproperty 'MS_Description', N'¬œ—”', 'user', 'dbo', 'table', 'Personnel', 'column', 'address'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘„«—Â  ·›‰', 'user', 'dbo', 'table', 'Personnel', 'column', 'tel'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘„«—Â „Ê»«Ì·', 'user', 'dbo', 'table', 'Personnel', 'column', 'mobile'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„»·€ »œÂﬂ«—', 'user', 'dbo', 'table', 'Personnel', 'column', 'bedehkar'
GO

EXEC sp_addextendedproperty 'MS_Description', N'›Ì‘ “»«·Â', 'user', 'dbo', 'table', 'Personnel', 'column', 'zobaleFlag'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ﬂœ Â„”«ÌÂ', 'user', 'dbo', 'table', 'Personnel', 'column', 'f_NextPersonCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â Å” „«‰œ', 'user', 'dbo', 'table', 'Personnel', 'column', 'f_TrashAmountID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â òÊçÂ', 'user', 'dbo', 'table', 'Personnel', 'column', 'f_TownStreetID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰Ê⁄ „«·òÌ ', 'user', 'dbo', 'table', 'Personnel', 'column', 'OwnerType'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘€· ”—Å—”  Œ«‰Ê«—', 'user', 'dbo', 'table', 'Personnel', 'column', 'Job'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘„«—Â Å—Ê«‰Â ”«Œ „«‰', 'user', 'dbo', 'table', 'Personnel', 'column', 'BuildingDocumentNo'
GO
