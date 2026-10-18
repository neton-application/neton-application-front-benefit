"use client";

import * as React from "react";
import { ResourcePage } from "@neton/application-front-resource";
import { useT } from "@neton/application-front-runtime/i18n";

/**
 * 可兑换权益。模块不知道「白名单」「NFT」是什么，只知道一个物品要多少积分、限量多少、何时能兑。
 * 图片经本模块自己的 upload-image 端点走 infra 的 generic_image 策略。
 */
export default function Page() {
  const t = useT("benefit");
  const statusOptions = [{ label: t("item.status.listed"), value: 1 }, { label: t("item.status.delisted"), value: 0 }];
  return (
    <ResourcePage
      config={{
        resourceKey: "benefit-item",
        errorNamespace: "benefit",
        eyebrow: t("common.eyebrow"),
        title: t("item.title"),
        description: t("item.description"),
        endpoint: "/benefit/item",
        listPath: "page",
        permissions: { page: "benefit:item:list", create: "benefit:item:save", update: "benefit:item:save", delete: "benefit:item:delete" },
        fields: [
          { key: "imageUrl", label: t("item.field.image"), type: "image", uploadPath: "/admin/benefit/item/upload-image", imageFileIdKey: "imageFileId" },
          // 目录只有几十条,一眼能扫完;名称留在表格主列比塞进搜索框更有用。
          { key: "name", label: t("item.field.name"), required: true },
          { key: "description", label: t("item.field.description"), type: "textarea" },
          { key: "pointCost", label: t("item.field.pointCost"), type: "number", required: true },
          { key: "totalStock", label: t("item.field.totalStock"), type: "number", defaultValue: 0 },
          { key: "redeemedCount", label: t("item.field.redeemedCount"), type: "number", editable: false },
          { key: "perUserLimit", label: t("item.field.perUserLimit"), type: "number", defaultValue: 0 },
          { key: "startsAt", label: t("item.field.startsAt"), type: "number", defaultValue: 0 },
          { key: "endsAt", label: t("item.field.endsAt"), type: "number" },
          // 同一约定：filter:true 那份只喂列表页顶部的筛选下拉。这里必须再放一份
          // 不带 filter 的,否则「状态」既不出现在表格里,也不出现在新增/编辑表单里——
          // 后台就再也没有办法上架/下架了,而上面的描述文案还在说「请改为下架」。
          { key: "status", label: t("common.field.status"), type: "select", filter: true, options: statusOptions },
          { key: "status", label: t("common.field.status"), type: "select", format: "status", defaultValue: 1, options: statusOptions },
          { key: "sort", label: t("item.field.sort"), type: "number", defaultValue: 0 },
          { key: "createdAt", label: t("common.field.createdAt"), format: "date" },
        ],
        mapSave: (record) => ({
          ...record,
          pointCost: Number(record.pointCost ?? 0),
          totalStock: Number(record.totalStock ?? 0),
          perUserLimit: Number(record.perUserLimit ?? 0),
          startsAt: Number(record.startsAt ?? 0),
          endsAt: record.endsAt === "" || record.endsAt === undefined || record.endsAt === null ? null : Number(record.endsAt),
          status: Number(record.status ?? 1),
          sort: Number(record.sort ?? 0),
        }),
      }}
    />
  );
}
