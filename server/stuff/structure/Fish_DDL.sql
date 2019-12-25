CREATE TABLE [dbo].[Fish] (
  [fishID] varchar(20) COLLATE Arabic_CI_AS NOT NULL,
  [fishYear] int NOT NULL,
  [Period] varchar(70) COLLATE Arabic_CI_AS NOT NULL,
  [fromDate] datetime NOT NULL,
  [toDate] datetime NOT NULL,
  [registerDate] datetime NOT NULL,
  [message] varchar(250) COLLATE Arabic_CI_AS NOT NULL,
  [f_ShoarID] numeric(18, 0) NOT NULL,
  [f_AccountNo] varchar(20) COLLATE Arabic_CI_AS NULL,
  [deadLineDate] datetime NOT NULL,
  [f_TownCode] int NOT NULL,
  [printed] bit CONSTRAINT [DF_Fish_printed] DEFAULT 0 NOT NULL,
  [transfered] bit CONSTRAINT [DF_Fish_transfered] DEFAULT 0 NULL,
  [trashPeriod] int NULL,
  CONSTRAINT [PK_Fish] PRIMARY KEY CLUSTERED ([fishID]),
  CONSTRAINT [FK_Fish_Shoar] FOREIGN KEY ([f_ShoarID]) 
  REFERENCES [dbo].[Shoar] ([shoarID]) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
  NOT FOR REPLICATION,
  CONSTRAINT [FK_Fish_BankAccount] FOREIGN KEY ([f_AccountNo]) 
  REFERENCES [dbo].[BankAccount] ([AccountNo]) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
  NOT FOR REPLICATION,
  CONSTRAINT [FK_Fish_Town] FOREIGN KEY ([f_TownCode]) 
  REFERENCES [dbo].[Town] ([TownCode]) 
  ON UPDATE CASCADE
  ON DELETE NO ACTION
)
ON [PRIMARY]
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â ›Ì‘', 'user', 'dbo', 'table', 'Fish', 'column', 'fishID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'”«·', 'user', 'dbo', 'table', 'Fish', 'column', 'fishYear'
GO

EXEC sp_addextendedproperty 'MS_Description', N'œÊ—Â', 'user', 'dbo', 'table', 'Fish', 'column', 'Period'
GO

EXEC sp_addextendedproperty 'MS_Description', N'«“  «—ÌŒ', 'user', 'dbo', 'table', 'Fish', 'column', 'fromDate'
GO

EXEC sp_addextendedproperty 'MS_Description', N' «  «—ÌŒ', 'user', 'dbo', 'table', 'Fish', 'column', 'toDate'
GO

EXEC sp_addextendedproperty 'MS_Description', N' «—ÌŒ ’œÊ—', 'user', 'dbo', 'table', 'Fish', 'column', 'registerDate'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ÅÌ«„', 'user', 'dbo', 'table', 'Fish', 'column', 'message'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘‰«”Â ‘⁄«—', 'user', 'dbo', 'table', 'Fish', 'column', 'f_ShoarID'
GO

EXEC sp_addextendedproperty 'MS_Description', N'‘„«—Â Õ”«»', 'user', 'dbo', 'table', 'Fish', 'column', 'f_AccountNo'
GO

EXEC sp_addextendedproperty 'MS_Description', N'„Â·  Å—œ«Œ ', 'user', 'dbo', 'table', 'Fish', 'column', 'deadLineDate'
GO

EXEC sp_addextendedproperty 'MS_Description', N'òœ —Ê” «', 'user', 'dbo', 'table', 'Fish', 'column', 'f_TownCode'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ç«Å ‰Â«ÌÌ', 'user', 'dbo', 'table', 'Fish', 'column', 'printed'
GO

EXEC sp_addextendedproperty 'MS_Description', N'«‰ ﬁ«· œ—¬„œ', 'user', 'dbo', 'table', 'Fish', 'column', 'transfered'
GO

EXEC sp_addextendedproperty 'MS_Description', N'ÿÊ· œÊ—Â', 'user', 'dbo', 'table', 'Fish', 'column', 'trashPeriod'
GO
