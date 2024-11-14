import { Button, Modal, Radio } from "antd";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC, useState } from "react";

import { useGetDocsByStatementIdQuery } from "@/store/services/petApi";

const ViewerPdf = dynamic(() => import("@/components/shared/viewer-pdf"), {
  ssr: false,
});

const ViewDocuments: FC<{ certificateId: string; certificateType: string }> = ({
  certificateId,
}) => {
  const [indexSelectedDocument, setIndexSelectedDocument] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const { data: docsList = [] } = useGetDocsByStatementIdQuery(
    certificateId as string
  );
  const t = useTranslations();

  const handleHideModal = () => setOpen(false);
  const handleShowModal = () => setOpen(true);

  const renderedDocList = docsList.filter(
    (doc: any) => !!doc?.name && doc.documentType !== "EMPTY"
  );

  const selectedDocument = renderedDocList[indexSelectedDocument];

  return (
    <>
      <Link href="#" onClick={handleShowModal} type="text">
        <Button>Свидетельство</Button>
      </Link>
      <Modal
        open={isOpen}
        title={t("common.show")}
        onCancel={handleHideModal}
        style={{ top: 20 }}
        footer={[]}
        width={1000}
      >
        <div className="max-w-[1000px] w-full mx-auto my-3">
          <div className="h-full py-2">
            <div className="w-full h-[800px]">
              <ViewerPdf
                fileName={selectedDocument?.name}
                fileUrl={
                  (selectedDocument as any)?.url ||
                  `https://almetico.university.kg/cattle-dev/pet/${certificateId}/preview`
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewDocuments;
