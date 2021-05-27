use crasdefault;

create table Maquinas(
	hostName varchar(255) primary key,
                sistemaoperacional varchar(255),
	processadorInfo varchar(255),
                qtdMemoria varchar(255),
                qtdParticoes int,
	latidude varchar(255), 
	longitude varchar(255)
);

create table logs (
	momentoCaptura datetime,
	usoCpu varchar(255),
	usoMemoria varchar(255),
	tempoUso varchar(255),
                fkMaquina varchar(255), foreign key(fkMaquina) references Maquinas(hostName),
	primary key (fkMaquina, momentoCaptura)
);

create table discos(
	id int  NOT NULL AUTO_INCREMENT,
	momentoCaptura datetime,
	pontoDeMontagem varchar(255),
	espacoTotal double,
	espacoDisponivel double,
	fkMaquina varchar(255), foreign key(fkMaquina) references Maquinas(hostName),
	primary key (fkMaquina, momentoCaptura),
	key id (id)

) AUTO_INCREMENT=1; 
