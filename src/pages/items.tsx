"use client";

import * as React from "react";
import { ResourcePage } from "@neton/application-front-resource";

/**
 * 可兑换权益。模块不知道「白名单」「NFT」是什么，只知道一个物品要多少积分、限量多少、何时能兑。
 * 图片经本模块自己的 upload-image 端点走 infra 的 generic_image 策略。
 */
export default function Page() {
  return (
    <ResourcePage
      config={{
        resourceKey: "benefit-item",
        eyebrow: "BENEFIT",
        title: "可兑换权益",
        description: "会员用积分兑换的权益。库存与每人限兑填 0 表示不限；结束时间留空表示不结束。已有兑换记录的权益不能删除，请改为下架。",
        endpoint: "/benefit/item",
        listPath: "page",
        permissions: { page: "benefit:item:list", create: "benefit:item:save", update: "benefit:item:save", delete: "benefit:item:delete" },
        fields: [
          { key: "imageUrl", label: "图片", type: "image", uploadPath: "/admin/benefit/item/upload-image", imageFileIdKey: "imageFileId" },
          // 目录只有几十条,一眼能扫完;名称留在表格主列比塞进搜索框更有用。
          { key: "name", label: "名称", required: true },
          { key: "description", label: "描述", type: "textarea" },
          { key: "pointCost", label: "所需积分", type: "number", required: true },
          { key: "totalStock", label: "总库存（0 不限）", type: "number", defaultValue: 0 },
          { key: "redeemedCount", label: "已兑出", type: "number", editable: false },
          { key: "perUserLimit", label: "每人限兑（0 不限）", type: "number", defaultValue: 0 },
          { key: "startsAt", label: "开始时间（毫秒时间戳）", type: "number", defaultValue: 0 },
          { key: "endsAt", label: "结束时间（毫秒时间戳，空=不结束）", type: "number" },
          // 同一约定：filter:true 那份只喂列表页顶部的筛选下拉。这里必须再放一份
          // 不带 filter 的,否则「状态」既不出现在表格里,也不出现在新增/编辑表单里——
          // 后台就再也没有办法上架/下架了,而上面的描述文案还在说「请改为下架」。
          { key: "status", label: "状态", type: "select", filter: true,
            options: [{ label: "上架", value: 1 }, { label: "下架", value: 0 }] },
          { key: "status", label: "状态", type: "select", format: "status", defaultValue: 1,
            options: [{ label: "上架", value: 1 }, { label: "下架", value: 0 }] },
          { key: "sort", label: "排序", type: "number", defaultValue: 0 },
          { key: "createdAt", label: "创建时间", format: "date" },
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
