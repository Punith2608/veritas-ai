from pydantic import BaseModel
from typing import List


class Evidence(BaseModel):
    title: str
    url: str
    relevance: float


class ResearchResult(BaseModel):
    summary: str
    sources: List[Evidence]
    search_queries: List[str]


class Plan(BaseModel):
    objective: str
    tasks: List[str]
    requires_research: bool
    requires_calculation: bool
    requires_verification: bool


class GeneratedAnswer(BaseModel):
    answer: str
    claims: List[str]
    assumptions: List[str]
    confidence: float


class VerificationCheck(BaseModel):
    status: str
    score: float
    reason: str


class VerificationResult(BaseModel):
    status: str
    confidence: float
    evidence: VerificationCheck
    logic: VerificationCheck
    calculation: VerificationCheck
    contradiction: VerificationCheck
    risk: VerificationCheck
    issues: List[str]