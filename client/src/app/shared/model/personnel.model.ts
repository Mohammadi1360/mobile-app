export class Personnel {
    constructor(
        public id: number,
        public personCode: number,
        public firstName: string,
        public lastName: string,
        public fatherName: string,
        public certificateNo: string,
        public melliCode: string,
        public sex: boolean,
        public address: string,
        public tel: string,
        public mobile: string,
        public deptAmount: number,
        public trashService: boolean,
        public neighborId: number,
        public ownerType: string,
        public job: string,
        public buildingDocumentNo: string
    ) {}

}
