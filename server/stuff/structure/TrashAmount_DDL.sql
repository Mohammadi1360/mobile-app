CREATE TABLE [dbo].[TrashAmount] (
  [TrashAmountID] int NOT NULL,
  [locationType] varchar(100) COLLATE Arabic_CI_AS NOT NULL,
  [TrashAmount] money CONSTRAINT [DF_TownLocations_amountZobale] DEFAULT 0 NOT NULL,
  [f_TownCode] int NOT NULL,
  CONSTRAINT [PK_TrashAmount] PRIMARY KEY CLUSTERED ([TrashAmountID], [f_TownCode]),
  CONSTRAINT [FK_TrashAmount_Town] FOREIGN KEY ([f_TownCode]) 
  REFERENCES [dbo].[Town] ([TownCode]) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
ON [PRIMARY]
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â Å” „«‰œ', 'user', 'dbo', 'table', 'TrashAmount', 'column', 'TrashAmountID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‰Ê⁄ ”òÊ‰ ', 'user', 'dbo', 'table', 'TrashAmount', 'column', 'locationType'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„»·€ ﬁ«»· Å—œ«Œ  ÃÂ  Ã„⁄ ¬Ê—Ì Å” „«‰œÂ«', 'user', 'dbo', 'table', 'TrashAmount', 'column', 'TrashAmount'
GO

EXEC sp_addextendedproperty 'MS_Description', N'òœ —Ê” «', 'user', 'dbo', 'table', 'TrashAmount', 'column', 'f_TownCode'
GO
