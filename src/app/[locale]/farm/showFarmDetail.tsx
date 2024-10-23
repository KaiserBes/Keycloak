// import { Divider, Modal } from "antd";
// import dayjs from "dayjs";
// import { FC } from "react";

// import Loading from "@/app/[locale]/loading";

// import { IFarm } from "@/store/models/interfaces/farm.interfaces";
// import { useGetFarmQuery } from "@/store/services/farmApi";

// import { ModalType } from "./page";
// import { useTranslations } from "next-intl";

// interface IProps {
//   id: { farmId: string; type: string };
//   onClose: () => void;
// }

// const PropertyAndValue: FC<{
//   title: string;
//   value: string | number;
// }> = ({ title, value }) => {
//   return (
//     <div className="lex w-full items-start gap-5 justify-between ">
//       <p>{title}</p>
//       <p className="text-end">{value}</p>
//     </div>
//   );
// };

// const ShowFarmDetail: FC<IProps> = ({ id, onClose }) => {
//   const t = useTranslations();
//   const { data: farm = {} as IFarm, isLoading } = useGetFarmQuery(id.farmId, {
//     skip: !id.farmId,
//   });

//   return (
//     <Modal
//       width={760}
//       onCancel={onClose}
//       open={!!id.farmId && id.type === ModalType.detail}
//     >
//       {isLoading && <Loading />}
//       {!isLoading && (
//         <div className="flex w-full flex-col gap-2 py-4">
//           <PropertyAndValue title="Фермер" value={farm?.performer?.title} />
//           <PropertyAndValue
//             title={t(`farmpage.paragraph`)}
//             value={farm?.title}
//           />
//           <PropertyAndValue title={t("farmpage.try")} value={farm?.state} />
//           <PropertyAndValue title={t("common.re-assign")} value={farm?.type} />
//           <PropertyAndValue title="Режим" value={farm?.mode || ""} />

//           <PropertyAndValue
//             title="Дата создания"
//             value={dayjs(farm.createdAt).format("DD-MM-YYYY HH:mm:ss")}
//           />
//           <PropertyAndValue
//             title="Started At"
//             value={dayjs(farm.startedAt).format("DD-MM-YYYY HH:mm:ss")}
//           />
//           {farm.scheduledAt && (
//             <PropertyAndValue
//               title="Scheduled At"
//               value={dayjs(farm.scheduledAt).format("DD-MM-YYYY HH:mm:ss")}
//             />
//           )}
//           {farm.closedAt && (
//             <PropertyAndValue
//               title="Finished At"
//               value={dayjs(farm.closedAt).format("DD-MM-YYYY HH:mm:ss")}
//             />
//           )}
//           <PropertyAndValue title="Counter" value={farm.requestCount} />

//           {farm?.request && (
//             <div className="border border-slate-800 p-5">
//               <Divider style={{ marginTop: "30px", fontWeight: 700 }}>
//                 Request
//               </Divider>
//             </div>
//           )}
//           {farm?.response && (
//             <div className="border border-slate-800 p-5">
//               <Divider style={{ marginTop: "30px", fontWeight: 700 }}>
//                 Response
//               </Divider>
//             </div>
//           )}
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ShowFarmDetail;
