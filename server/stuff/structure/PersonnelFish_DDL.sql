CREATE TABLE [dbo].[PersonnelFish] (
  [personnelFishID] varchar(30) COLLATE Arabic_CI_AS NOT NULL,
  [f_TownCode] int NOT NULL,
  [f_PersonCode] numeric(18, 0) NOT NULL,
  [f_FishID] varchar(20) COLLATE Arabic_CI_AS NOT NULL,
  [fishAmount] money CONSTRAINT [DF_PersonnelFish_fishAmount] DEFAULT 0 NULL,
  [payAmount] money CONSTRAINT [DF_PersonnelFish_payAmount] DEFAULT 0 NULL,
  CONSTRAINT [PK_PersonnelFish] PRIMARY KEY CLUSTERED ([personnelFishID]),
  CONSTRAINT [FK_PersonnelFish_Fish] FOREIGN KEY ([f_FishID]) 
  REFERENCES [dbo].[Fish] ([fishID]) 
  ON UPDATE CASCADE
  ON DELETE CASCADE
)
ON [PRIMARY]
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â Å—œ«Œ ', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'personnelFishID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'òœ —Ê” «', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'f_TownCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ﬂœ «‘ —«ﬂ', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'f_PersonCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â ›Ì‘', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'f_FishID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„»·€ ›Ì‘', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'fishAmount'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„»·€ Å—œ«Œ Ì', 'user', 'dbo', 'table', 'PersonnelFish', 'column', 'payAmount'
GO
