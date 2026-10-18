"use client";

import * as React from "react";
import { ResourcePage } from "@neton/application-front-resource";
import { useT } from "@neton/application-front-runtime/i18n";

/**
 * 兑换记录，即权益凭证。只读：本阶段由人工看「谁兑了什么」并在别处交付；
 * 标记已使用/作废是消费方系统的事，将来给它设计 API，而不是在这里加一个状态下拉。
 */
export default function Page() {
  const t = useT("benefit");
  return (
    <ResourcePage
      config={{
        resourceKey: "benefit-redemption",
        errorNamespace: "benefit",
        eyebrow: t("common.eyebrow"),
        title: t("redemption.title"),
        description: t("redemption.description"),
        endpoint: "/benefit/redemption",
        listPath: "page",
        readOnly: true,
        permissions: { page: "benefit:redemption:list" },
        fields: [
          { key: "id", label: t("redemption.field.id"), format: "mono" },
          // userId / status 各出现两次：filter:true 的一份只进筛选框，
          // 不带 filter 的一份才会出现在表格列(见 front-resource 的既有约定：
          // filterFields 与 tableFields 各自独立从 fields 里挑,filter:true 的条目
          // 永远不进表格)。这页存在的意义就是「谁兑了什么」,用户 ID 只能筛不能看
          // 等于白做。key 相同没有冲突：这两个列表互不重叠,只读页也没有编辑表单
          // 会因重复 key 而混淆。
          { key: "userId", label: t("redemption.field.userId"), format: "mono", filter: true },
          { key: "userId", label: t("redemption.field.userId"), format: "mono" },
          { key: "redeemedAt", label: t("redemption.field.redeemedAt"), format: "date" },
          { key: "itemId", label: t("redemption.field.itemId"), format: "mono", filter: true },
          { key: "itemName", label: t("redemption.field.itemName") },
          { key: "pointCost", label: t("redemption.field.pointCost"), type: "number" },
          { key: "status", label: t("common.field.status"), type: "select", filter: true,
            options: [{ label: t("redemption.status.acquired"), value: 1 }, { label: t("redemption.status.used"), value: 2 }, { label: t("redemption.status.voided"), value: 3 }] },
          // 数字原样显示（1/2/3）；上面筛选下拉里已经写明对应含义。
          { key: "status", label: t("common.field.status") },
          { key: "pointRecordId", label: t("redemption.field.pointRecordId"), format: "mono" },
        ],
      }}
    />
  );
}
