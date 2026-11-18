import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted", () => {
    member.monthlyFee = 1000;
    member.discount = 10;
    const other = new Member({
      name: "Bruno Silva",
      documentId: "87654321",
      plan: "basic",
      monthlyFee: 500,
    });
    list.add(member);
    list.add(other);
    expect(list.totalDiscounted()).toBe(1400);
  });

  test("total discounted of an empty list", () => {
    expect(list.totalDiscounted()).toBe(0);
  });

  test("update the fee of a member", () => {
    list.add(member);
    list.updateFee("12345678", 2000);
    expect(member.monthlyFee).toBe(2000);
  });

  test("reject updating the fee of a missing member", () => {
    expect(() => list.updateFee("999", 2000)).toThrow();
  });

  test("reject an invalid fee when updating", () => {
    list.add(member);
    expect(() => list.updateFee("12345678", 0)).toThrow();
  });
});
